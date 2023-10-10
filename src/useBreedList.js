import React from "react";
import { useState, useEffect } from "react";

const localCache = {};
console.log(localCache, "localCache");
export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      // if animal is set inside localCache- set it to state- avoiding unnecessary API call
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");

      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();
      localCache[animal] = json.breeds || []; // save the newest data to local cache
      console.log(localCache, "local cache object");
      console.log(localCache[animal], "local cache updated");
      console.log("selected animal", animal);
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
}
