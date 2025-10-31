import { createSlice } from '@reduxjs/toolkit'
import sampleData from '../../../sample_data/utility.json'

const initialState = {
  billers: sampleData.billers || [],
  payments: sampleData.payments || []
}

const utilitySlice = createSlice({
  name: 'utility',
  initialState,
  reducers: {
    addBiller(state, action){
      state.billers.push(action.payload)
    },
    removeBiller(state, action){
      state.billers = state.billers.filter(b => b.id !== action.payload)
    },
    addPayment(state, action){
      state.payments.unshift(action.payload)
    }
  }
})

export const { addBiller, removeBiller, addPayment } = utilitySlice.actions
export default utilitySlice.reducer
