import { createSlice } from '@reduxjs/toolkit'


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