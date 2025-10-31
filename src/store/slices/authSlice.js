import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  role: null,
  token: null,
  otpSent: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action){
      state.user = action.payload.user
      state.role = action.payload.role
      state.token = action.payload.token
    },
    logout(state){
      state.user = null
      state.role = null
      state.token = null
    },
    setOtpSent(state, action){
      state.otpSent = action.payload
    }
  }
})

export const { loginSuccess, logout, setOtpSent } = authSlice.actions
export default authSlice.reducer
