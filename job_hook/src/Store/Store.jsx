
import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../Slices/UserSlices'
import profileReducer from '../Slices/ProfileSlice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    profile:profileReducer
  },
}) 
