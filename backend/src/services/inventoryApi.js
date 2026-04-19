import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; 

export const inventoryApi = {
  getAll: () => axios.get(`${API_URL}/inventory`),
  getById: (id) => axios.get(`${API_URL}/inventory/${id}`),
  
  // post /register to create a new inventory item
  create: (formData) => axios.post(`${API_URL}/register`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  updateText: (id, data) => axios.put(`${API_URL}/inventory/${id}`, data),
  
  updatePhoto: (id, formData) => axios.put(`${API_URL}/inventory/${id}/photo`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  delete: (id) => axios.delete(`${API_URL}/inventory/${id}`)
};