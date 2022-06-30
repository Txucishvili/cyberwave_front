import { createSlice, configureStore } from '@reduxjs/toolkit'
import { RootState } from '..';


export interface GamesListStore {
  isLoading: boolean,
  list: any[]
};

// Define the initial state using that type
const initialState = {
  isLoading: false,
  list: []
};

export const name = 'gameList';
const gamesSlice = createSlice({
  name,
  initialState: initialState,
  reducers: {
    addGame: (state, action) => {
      console.log('state, dispatch', action.payload);
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
export const selectGames = (state: RootState) => state.gameList;
export const { addGame, updateGames } = gamesSlice.actions
