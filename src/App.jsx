import { useState, lazy, Suspense } from "react";

import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AdoptedPetContext from "./AdoptedPetContext";

const Details = lazy(() => import("./Details"));
// dynamic import for ES6 modules
// both of these components wont load until the user goes to their routes
const SearchParams = lazy(() => import("./SearchParams"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // When to refetch data - in MS
      cacheTime: Infinity, // For how long to cache data - cache is stored in memory
    },
  },
});

const App = () => {
  const adoptedPetHook = useState(null);

  return (
    <div
      className="p-0 m-0"
      style={{
        background: "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)",
      }}
    >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Suspense
            fallback={
              <div className="loading-pane">
                <h2 className="loader">🐶</h2>{" "}
              </div>
            }
          >
            <AdoptedPetContext.Provider value={adoptedPetHook}>
              <header className="w-full mb-10 text-center p-7 bg-gradient-to-b from-yellow-500 via-orange-500 to-red-500">
                <Link
                  to="/"
                  className="text-6xl text-white hover:text-gray-400"
                >
                  <h1 className="text-6xl text-white hover:text-gray-200">
                    Adopt me!
                  </h1>
                </Link>
              </header>
              <Routes>
                <Route path="/details/:id" element={<Details />} />
                <Route path="/" element={<SearchParams />} />
              </Routes>
            </AdoptedPetContext.Provider>
          </Suspense>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
