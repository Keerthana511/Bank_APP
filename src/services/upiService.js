import api from './authService'

export const makeUpiPayment = async (payload) => {
  return api.post('/api/upi/pay', payload)
}
