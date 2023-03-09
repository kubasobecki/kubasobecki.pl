import { createSlice } from "@reduxjs/toolkit";

const navOpenSlice = createSlice({
  name: "navOpen",
  initialState: false,
  reducers: {
    navOpenToggle: (state) => !state,
  },
});

export const navOpenActions = navOpenSlice.actions;
export default navOpenSlice.reducer;
