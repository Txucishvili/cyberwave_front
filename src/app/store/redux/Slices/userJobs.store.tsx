import { createSlice, configureStore } from '@reduxjs/toolkit'
import { RootState } from '..';


export interface UserJobsState {
  isLoading: boolean,
  list: any[]
};

// Define the initial state using that type
const initialState = {
  isLoading: false,
  list: []
};

export const name = 'userJobs';
const gamesSlice = createSlice({
  name,
  initialState: initialState,
  reducers: {
    pushJobs: (state, action) => {
      // state.list.push(action.payload);
      const list = action.payload;

      return {
        ...state,
        list
      };
    },
    updateGames: state => {
      state;
    }
  }
})
export default gamesSlice;
export const selectUserJobs = (state: RootState) => state[name];
export const { pushJobs, updateGames } = gamesSlice.actions
