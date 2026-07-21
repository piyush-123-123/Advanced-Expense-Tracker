import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counter: 0,
  },
  reducers: {
    incrementBy2(state) {
      state.counter +=2;
    },
    decrementBy2(state) {
      state.counter -=2;
    },
    incrementByAmount(state, action) {
      state.counter += action.payload;
    },
  },
});

export const { incrementBy2, decrementBy2 } = counterSlice.actions;

export default counterSlice.reducer;