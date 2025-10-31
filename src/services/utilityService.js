import api from './authService'

export const payBiller = async (payload) => {
  return api.post('/api/biller/pay', payload)
}
