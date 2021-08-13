import { createSlice, configureStore } from '@reduxjs/toolkit'
export const name = 'user';
const userSlice = createSlice({
  name,
  initialState: {
    value: 2
  },
  reducers: {
    incremented: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decremented: state => {
      state.value -= 1
    }
  }
})
export default userSlice;
export const { incremented, decremented } = userSlice.actions
