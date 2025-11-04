import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAnimeDetail } from "../../services/jikan";
import type { RootState } from "../../store";
import type { AnimeDetail } from "../../types/anime";

interface DetailState {
  item: AnimeDetail | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

let detailAbortController: AbortController | null = null;

const initialState: DetailState = {
  item: null,
  status: "idle",
  error: null
};

export const fetchAnimeDetail = createAsyncThunk<
  AnimeDetail,
  number,
  { rejectValue: string | { aborted: true } }
>("detail/fetchAnimeDetail", async (id, thunkAPI) => {
  if (detailAbortController) {
    detailAbortController.abort();
  }

  const controller = new AbortController();
  detailAbortController = controller;

  const abortListener = () => controller.abort();
  thunkAPI.signal.addEventListener("abort", abortListener);

  try {
    return await getAnimeDetail(id, controller.signal);
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return thunkAPI.rejectWithValue({ aborted: true });
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return thunkAPI.rejectWithValue(message);
  } finally {
    detailAbortController = null;
    thunkAPI.signal.removeEventListener("abort", abortListener);
  }
});

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    clearDetail(state) {
      state.item = null;
      state.status = "idle";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeDetail.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAnimeDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.item = action.payload;
      })
      .addCase(fetchAnimeDetail.rejected, (state, action) => {
        if (action.payload && typeof action.payload === "object" && "aborted" in action.payload) {
          state.status = "idle";
          return;
        }

        state.status = "failed";
        state.error = (typeof action.payload === "string" && action.payload) || action.error.message || "Failed to load detail";
      });
  }
});

export const { clearDetail } = detailSlice.actions;

export const selectDetailState = (state: RootState) => state.detail;

export default detailSlice.reducer;
