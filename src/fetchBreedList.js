const fetchBreedList = async ({ queryKey }) => {
  const animal = queryKey[1];

  if (!animal) return []; // prevent React Query refetching when animal is not selected.

  const apiRes = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );

  if (!apiRes.ok) {
    // fetch won't throw error if its 500 error- so throw it manualy
    throw new Error(`breeds/${id} fetch is not ok`);
  }

  return apiRes.json();
};

export default fetchBreedList;
