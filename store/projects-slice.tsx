import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchProjects } from "@/utilities/api";

interface Project {
  id: number;
  name: string;
  tags?: string[];
  stack?: string[];
  date?: string;
  images?: {
    main?: string;
    other?: string[];
  };
  description?: string;
}

export const fetchProjectsThunk = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await fetchProjects();
    return response;
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    status: "idle",
    entries: null,
    filter: "",
    error: null,
  },
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
