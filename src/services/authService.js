import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '' })

export const login = async (credentials) => {
  return api.post('/api/login', credentials)
}

export const register = async (data) => {
  return api.post('/api/register', data)
}

export default api
