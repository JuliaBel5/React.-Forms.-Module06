import { createSlice } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { store } from './store'


export interface marsFormState {
  marsFirstName: string
  marsLastName: string
  marsAge: number
}
const initialState: marsFormState = {
  marsFirstName: "",
  marsLastName: "",
  marsAge: 0,
}

export const marsSlice = createSlice({
  name: 'mars',
  initialState,
  reducers: {
    setMarsFirstName: (state, action) => {
      state.marsLastName = action.payload
    },
      setMarsLastName: (state, action) => {
      state.marsFirstName = action.payload
    },
    setMarsAge: (state, action) => {
      state.marsAge = action.payload
    },
  },
})

export const { reducer: marsReducer, actions: marsActions } = marsSlice

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = useDispatch<AppDispatch>