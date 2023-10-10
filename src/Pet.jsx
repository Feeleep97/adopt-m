import React from "react";

const Pet = ({ name, animal, breed, images, location, id }) => {
  let hero = "http://pets-imagges.dev-apis.com/pets/none.jpg"; // placeholder image

  if (images.length) {
    // set a pet icon if it exists
    hero = images[0];
  }
  return (
    <a href={`/detauls/${id}`} className="pet">
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
    </a>
  );
};
export default Pet;
