import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchProjects } from "@/utilities/api";

export interface Project {
  id: number;
  name: string;
  slug: string;
  tags?: string[];
  stack?: string[];
  date?: string;
  images?: {
    main?: string;
    other?: string[];
  };
  description?: string;
}

interface InitialState {
  status: string;
  entries: Project[];
  filter: string;
  error: any;
}

export const fetchProjectsThunk = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await fetchProjects();
    return response;
  }
);

const initialState: InitialState = {
  status: "idle",
  entries: [],
  filter: "",
  error: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjectsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entries = action.payload;
      })
      .addCase(fetchProjectsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setFilter } = projectsSlice.actions;
export default projectsSlice.reducer;
