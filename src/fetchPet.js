const fetchPet = async ({ queryKey }) => {
  const id = queryKey[1];

  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

  if (!apiRes.ok) {
    // fetch won't throw error if its 500 error- so throw it manualy
    throw new Error(`details/${id} fetch is not ok`);
  }

  return apiRes.json();
};

export default fetchPet;
