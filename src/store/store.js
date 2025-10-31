import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import bankingReducer from './slices/bankingSlice'
import upiReducer from './slices/upiSlice'
import utilityReducer from './slices/utilitySlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    banking: bankingReducer,
    upi: upiReducer,
    utility: utilityReducer
  }
})
