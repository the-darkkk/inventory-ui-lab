import axios from 'axios';

const API_URL = 'http://localhost:3000'; // backend url

export const inventoryApi = {
  getAll: () => axios.get(`${API_URL}/inventory`),
  getById: (id) => axios.get(`${API_URL}/inventory/${id}`), //?
};