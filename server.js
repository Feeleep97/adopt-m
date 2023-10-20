import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import renderApp from "./dist/server/ServerApp.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // current directory

const PORT = process.env.PORT || 3001;

const html = fs
  .readFileSync(path.resolve(__dirname, "./dist/client/index.html"))
  .toString(); //return paths for css,js

const parts = html.split("not rendered");

const app = express();
app.use(
  "/assets",
  express.static(path.resolve(__dirname, "./dist/client/assets"))
);

app.use((req, res) => {
  res.write(parts[0]); //show the user static html- head

  const stream = renderApp(req.url, {
    onShellReady() {
      stream.pipe(res);
    },
    onShellError(e) {
      console.error(e, "error");
    },
    onAllReady() {
      // write the rest of the index.html here
      res.write(parts[1]);
      res.end();
    },
    onError(err) {
      console.error(err);
    },
  });
});

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);
