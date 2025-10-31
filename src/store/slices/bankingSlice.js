import { createSlice } from '@reduxjs/toolkit'
import sampleData from '../../../sample_data/banking.json'

const initialState = {
  transactions: sampleData.transactions || [],
  beneficiaries: sampleData.beneficiaries || []
}

const bankingSlice = createSlice({
  name: 'banking',
  initialState,
  reducers: {
    addBeneficiary(state, action){
      state.beneficiaries.push(action.payload)
    },
    removeBeneficiary(state, action){
      state.beneficiaries = state.beneficiaries.filter(b => b.id !== action.payload)
    },
    addTransaction(state, action){
      state.transactions.unshift(action.payload)
    }
  }
})

export const { addBeneficiary, removeBeneficiary, addTransaction } = bankingSlice.actions
export default bankingSlice.reducer
