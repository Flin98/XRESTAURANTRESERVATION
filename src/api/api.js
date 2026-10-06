import axios from 'axios';

const BASE_URL = 'https://restaurantdata.onrender.com';

export const getStates = async () => {
  const response = await axios.get(`${BASE_URL}/states`);
  return response.data;
};

export const getCities = async (state) => {
  const response = await axios.get(`${BASE_URL}/cities/${encodeURIComponent(state)}`);
  return response.data;
};

export const getRestaurants = async (state, city) => {
  const response = await axios.get(
    `${BASE_URL}/restaurants?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`
  );
  return response.data;
};