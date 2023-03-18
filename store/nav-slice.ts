import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
type NavState = boolean;

// Define the initial state using that type
const initialState: NavState = false;

const navOpenSlice = createSlice({
  name: "navOpen",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    navOpenToggle: (state) => !state,
  },
});

export const { navOpenToggle } = navOpenSlice.actions;
export default navOpenSlice.reducer;
