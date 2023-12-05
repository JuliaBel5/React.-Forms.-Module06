import { configureStore, Store } from '@reduxjs/toolkit'
import { marsReducer } from './MarsSlice'
import { moonReducer } from './MoonSlice'

export const store: Store = configureStore({
  reducer: {
    moon: moonReducer,
    mars: marsReducer,
  },
})
