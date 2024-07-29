import axios from 'axios';

const API_URL = 'https://pets-v2.dev-apis.com';

export const fetchPets = async (page, animalType) => {
  // console.log(sortCriteria)
  const animalQuery = animalType ? `&animal=${animalType}` : '';
  const response = await axios.get(`${API_URL}/pets?page=${page}${animalQuery}`);
  return response.data;
};

export const fetchPetById = async (id) => {
  const response = await axios.get(`${API_URL}/pets?id=${id}`);
  return response.data.pets[0];
};

export const fetchBreeds = async (animal) => {
  const response = await axios.get(`${API_URL}/breeds?animal=${animal}`);
  return response.data.breeds;
};

export const searchPets = async (params) => {
  const { animal, location, breed } = params;
  const response = await axios.get(`${ API_URL }/pets?animal=${animal}&location=${location}&breed=${breed}`);
  return response.data;
};
