import api from './authService'

export const transferFunds = async (payload) => {
  return api.post('/api/transfer', payload)
}
