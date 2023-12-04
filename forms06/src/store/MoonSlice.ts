import { createSlice } from '@reduxjs/toolkit'

export interface MoonFormState {
  firstName: string
  lastName: string
  age: number
  email: string
  password: string
  confirmPassword: string
  gender: string
  termsAndConditions: boolean
  picture: string
  country: string
}

interface MoonState {
  moonData: MoonFormState[]
  moonTilesNumber: number
}
const initialState: MoonState = {
  moonData: [],
  moonTilesNumber: 0,
}

export const moonSlice = createSlice({
  name: 'moon',
  initialState,
  reducers: {
    setMoonState: (state, action) => {
      state.moonData.push(action.payload)
    },
    setMoonTilesNumber: (state, action) => {
      state.moonTilesNumber = action.payload
    },
  },
})

export const { reducer: moonReducer, actions: moonActions } = moonSlice
