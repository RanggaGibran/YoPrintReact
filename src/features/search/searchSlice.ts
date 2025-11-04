import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { searchAnime } from "../../services/jikan";
import type { RootState } from "../../store";
import type { AnimeListItem, PaginationInfo } from "../../types/anime";

interface SearchState {
  query: string;
  page: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  items: AnimeListItem[];
  pagination: PaginationInfo | null;
  error: string | null;
  lastExecutedQuery: string;
}

let searchAbortController: AbortController | null = null;

const initialState: SearchState = {
  query: "",
  page: 1,
  status: "idle",
  items: [],
  pagination: null,
  error: null,
  lastExecutedQuery: ""
};

interface FetchArgs {
  query: string;
  page: number;
}

interface FetchSuccess {
  items: AnimeListItem[];
  pagination: PaginationInfo;
}

export const fetchAnimeSearch = createAsyncThunk<
  FetchSuccess,
  FetchArgs,
  { rejectValue: string | { aborted: true } }
>("search/fetchAnimeSearch", async ({ query, page }, thunkAPI) => {
  if (!query.trim()) {
    if (searchAbortController) {
      searchAbortController.abort();
      searchAbortController = null;
    }
    return thunkAPI.rejectWithValue({ aborted: true });
  }

  if (searchAbortController) {
    searchAbortController.abort();
  }

  const controller = new AbortController();
  searchAbortController = controller;

  const abortListener = () => controller.abort();
  thunkAPI.signal.addEventListener("abort", abortListener);

  try {
    return await searchAnime(query, page, controller.signal);
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return thunkAPI.rejectWithValue({ aborted: true });
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return thunkAPI.rejectWithValue(message);
  } finally {
    searchAbortController = null;
    thunkAPI.signal.removeEventListener("abort", abortListener);
  }
});

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      const nextQuery = action.payload;
      if (state.query !== nextQuery) {
        state.query = nextQuery;
        state.page = 1;
      }
    },
    setPage(state, action: PayloadAction<number>) {
      const nextPage = Math.max(1, action.payload);
      state.page = nextPage;
    },
    hydrateSearchState(state, action: PayloadAction<{ query: string; page: number }>) {
      if (state.query !== action.payload.query) {
        state.query = action.payload.query;
      }
      if (state.page !== action.payload.page) {
        state.page = action.payload.page;
      }
    },
    clearResults(state) {
      state.items = [];
      state.pagination = null;
      state.status = "idle";
      state.error = null;
      state.lastExecutedQuery = "";
      state.page = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeSearch.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAnimeSearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.pagination = action.payload.pagination;
        state.error = null;
        state.lastExecutedQuery = state.query;
      })
      .addCase(fetchAnimeSearch.rejected, (state, action) => {
        if (action.payload && typeof action.payload === "object" && "aborted" in action.payload) {
          state.status = "idle";
          return;
        }

        state.status = "failed";
        state.error = (typeof action.payload === "string" && action.payload) || action.error.message || "Failed to load anime";
      });
  }
});

export const { setQuery, setPage, clearResults, hydrateSearchState } = searchSlice.actions;

export const selectSearchState = (state: RootState) => state.search;

export default searchSlice.reducer;
