import { configureStore } from '@reduxjs/toolkit'
import navReducer from './redux/navFlight'

export const store = configureStore({
  reducer: {
    nav: navReducer
  },
})
