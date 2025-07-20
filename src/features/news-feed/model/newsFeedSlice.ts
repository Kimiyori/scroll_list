import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { NewsApiResponse, NewsState } from "@/entities/news";
import { newsApi } from "@/shared/api/news";

const initialState: NewsState = {
  posts: [],
  loading: false,
  error: null,
  hasMore: true,
  skip: 0,
  total: 0,
};

export const fetchNews = createAsyncThunk<
  NewsApiResponse,
  { limit?: number; skip?: number },
  { rejectValue: string }
>(
  "newsFeed/fetchNews",
  async ({ limit = 10, skip = 0 }, { rejectWithValue }) => {
    try {
      return await newsApi.fetchPosts(limit, skip);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue(
        "An unexpected error occurred while fetching news"
      );
    }
  }
);

const newsFeedSlice = createSlice({
  name: "newsFeed",
  initialState,
  reducers: {
    resetNewsFeed: state => {
      Object.assign(state, initialState);
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchNews.fulfilled,
        (state, action: PayloadAction<NewsApiResponse>) => {
          const { posts, total, skip, limit } = action.payload;

          state.posts = [...state.posts, ...posts];
          state.skip = skip + limit;
          state.total = total;

          state.hasMore = state.posts.length > 0 && state.skip < total;

          state.loading = false;
        }
      )
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Unable to load news. Please try again.";
      });
  },
});

export const { resetNewsFeed, clearError } = newsFeedSlice.actions;
export default newsFeedSlice.reducer;
