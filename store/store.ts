import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme-slice";
import navOpenReducer from "./navopen-slice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    isNavOpen: navOpenReducer,
  },
});

export default store;
