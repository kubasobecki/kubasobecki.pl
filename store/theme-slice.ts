import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: "light",
  reducers: {
    setDarkMode: (state, action) => action.payload,
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
