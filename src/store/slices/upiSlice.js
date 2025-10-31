import { createSlice } from '@reduxjs/toolkit'
import sampleData from '../../../sample_data/upi.json'

const initialState = {
  upiTransactions: sampleData.upiTransactions || [],
  upiIds: sampleData.upiIds || []
}

const upiSlice = createSlice({
  name: 'upi',
  initialState,
  reducers: {
    addUpiId(state, action){
      state.upiIds.push(action.payload)
    },
    addUpiTransaction(state, action){
      state.upiTransactions.unshift(action.payload)
    }
  }
})

export const { addUpiId, addUpiTransaction } = upiSlice.actions
export default upiSlice.reducer
