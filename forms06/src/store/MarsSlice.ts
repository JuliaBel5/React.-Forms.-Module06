import { createSlice } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { store } from './store'


export interface MarsFormState {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
 termsAndConditions: boolean;
  picture: string;
  country: string;
}

interface MarsState {
  marsData: MarsFormState[];
  marsTilesNumber: number
 }

 const initialState: MarsState = {
  marsData: [],
  marsTilesNumber: 0
}

export const marsSlice = createSlice({
  name: 'mars',
  initialState,
  reducers: {
    setMarsState: (state, action) => {
      state.marsData.push(action.payload);
    },
    setMoonTilesNumber: (state, action) => {
      state.marsTilesNumber = action.payload
    },
  }
})

export const { reducer: marsReducer, actions: marsActions } = marsSlice

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = useDispatch<AppDispatch>