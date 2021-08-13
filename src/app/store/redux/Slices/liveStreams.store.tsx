import { createSlice, configureStore } from '@reduxjs/toolkit'
import { RootState } from '..';

export const name = 'liveStream';

const initialState = {
  isLoading: false,
  list: []
};

const liveStreamsSlice = createSlice({
  name,
  initialState: initialState,
  reducers: {
    incremented: (state, payload) => {

    },
    decremented: state => {

    }
  }
})
export default liveStreamsSlice;
export const selectStreams = (state: RootState) => state.liveStream;
export const { incremented, decremented } = liveStreamsSlice.actions
