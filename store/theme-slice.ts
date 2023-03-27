import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
type ThemeState = string;

// Define the initial state using that type
const initialState: ThemeState = "light";

const themeSlice = createSlice({
  name: "theme",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setTheme: (state, action: PayloadAction<string>) => action.payload,
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
