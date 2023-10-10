import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Hello, you are on details page</h1>
      <h2>id params from url {id}</h2>
    </div>
  );
};
export default Details;
