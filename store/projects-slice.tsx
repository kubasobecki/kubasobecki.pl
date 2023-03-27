import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
    error: null,
  },
  reducers: {},
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

// export const { setProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
