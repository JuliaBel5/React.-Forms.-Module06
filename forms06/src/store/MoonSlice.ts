import { createSlice } from '@reduxjs/toolkit'


export interface MoonFormState {
  moonFirstName: string
  moonLastName: string
  moonAge: number
}
const initialState: MoonFormState = {
  moonFirstName: "",
  moonLastName: "",
  moonAge: 0,
}

export const moonSlice = createSlice({
  name: 'moon',
  initialState,
  reducers: {
    setMoonFirstName: (state, action) => {
      state.moonLastName = action.payload
    },
      setMoonLastName: (state, action) => {
      state.moonFirstName = action.payload
    },
    setMoonAge: (state, action) => {
      state.moonAge = action.payload
    },
  },
})

export const { reducer: moonReducer, actions: moonActions } = moonSlice