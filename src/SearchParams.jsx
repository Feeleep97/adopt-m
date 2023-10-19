import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useBreedList from "./useBreedList";

import Results from "./Results";

import fetchSearch from "./fetchSearch";

import AdoptedPetContext from "./AdoptedPetContext";
const ANIMALS = ["bird", "cat", "rabbit", "dog", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breedList] = useBreedList(animal);
  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];
  const [adoptedPet] = useContext(AdoptedPetContext);
  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col items-center justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target); // pull the data from the form into an object
          const formValues = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(formValues);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}

        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            name="location"
            className="search-input"
            placeholder="location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            className="search-input"
            value={animal}
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          breed
          <select
            id="breed"
            className="search-input grayed-out-disabled"
            disabled={breedList.length === 0}
            name="breed"
          >
            <option />
            {breedList.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button className="rounded px-6 py-2 text-white hover:opacity-50 border-none bg-orange-500">
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
