import HTTPClient from '@API/axios';
import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '..';

export const myAsyncInSlice = createAsyncThunk(
  'games/fetchGames',
  async (e, thunkAPI) => {
    const {path, filters} = e;
    thunkAPI.dispatch(setFilters(filters))
    console.log('----', );

    const response = await HTTPClient.get(path);
    return response.data
  }
);

export interface GamesListStore {
  isLoading: boolean,
  list: any[],
  filterOptions: any[]
};

// Define the initial state using that type
const initialState = {
  isLoading: true,
  list: [],
  filterOptions: []
};

export const name = 'gamesPage';
const gamesPageSlice = createSlice({
  name,
  initialState: initialState,
  reducers: {
    setFilters: (state, action) => {
      console.log('state, dispatch', action.payload);
      // state.list.push(action.payload);
      const filterOptions = action.payload;

      return {
        ...state,
        filterOptions
      };
    },
  },
  extraReducers: (builder) => {
    console.log('builder', builder);
    builder.addCase(myAsyncInSlice.pending, (state, action) => {
      const list = ['test'];
      state.isLoading = true;

      state;
    }),
    builder.addCase(myAsyncInSlice.fulfilled, (state, action) => {
      state.isLoading = false;
      state.list = action.payload.results;

      state;
    })
  }
})
export default gamesPageSlice;
export const selectGames = (state: RootState) => state.gamesPage;
export const { addGame: setFilters } = gamesPageSlice.actions
