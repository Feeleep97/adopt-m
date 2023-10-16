import React from "react";
import { Link } from "react-router-dom";

const Pet = ({ name, animal, breed, images, location, id }) => {
  let hero = "http://pets-imagges.dev-apis.com/pets/none.jpg"; // placeholder image

  if (images.length) {
    // set a pet icon if it exists
    hero = images[0];
  }
  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>
          {animal} - {breed}
        </h2>
        <h3>{location}</h3>
      </div>
    </Link>
  );
};
export default Pet;
