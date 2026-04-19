import axios from 'axios';

const API_URL = 'http://localhost:3000'; // backend url

export const inventoryApi = {
  getAll: () => axios.get(`${API_URL}/inventory`),
  getById: (id) => axios.get(`${API_URL}/inventory/${id}`),
  
  // POST /register (multipart/form-data)
  create: (formData) => axios.post(`${API_URL}/register`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  // PUT /inventory/:id (JSON)
  updateText: (id, data) => axios.put(`${API_URL}/inventory/${id}`, data),
  
  // PUT /inventory/:id/photo (multipart/form-data)
  updatePhoto: (id, formData) => axios.put(`${API_URL}/inventory/${id}/photo`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  // DELETE /inventory/:id
  delete: (id) => axios.delete(`${API_URL}/inventory/${id}`)
};