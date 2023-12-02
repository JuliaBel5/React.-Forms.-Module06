import { configureStore, Store } from '@reduxjs/toolkit'
import { moonReducer } from './MoonSlice'
import { marsReducer } from './MarsSlice'


export const store: Store = configureStore({
  reducer: {
    moon: moonReducer,
    mars: marsReducer,
    
  },
  
})