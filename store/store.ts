import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme-slice";
import navReducer from "./nav-slice";
import projectsReducer from "./projects-slice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    isNavOpen: navReducer,
    projects: projectsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
