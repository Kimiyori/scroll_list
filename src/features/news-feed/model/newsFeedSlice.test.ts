import { configureStore } from "@reduxjs/toolkit";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { newsApi } from "@/shared/api/news";
import { mockApiResponse } from "@/test-utils/mocks";
import newsFeedReducer, {
  fetchNews,
  resetNewsFeed,
  clearError,
} from "./newsFeedSlice";

vi.mock("@/shared/api/news");
const mockedNewsApi = vi.mocked(newsApi);

const createTestStore = () => {
  return configureStore({
    reducer: {
      newsFeed: newsFeedReducer,
    },
  });
};

type TestStore = ReturnType<typeof createTestStore>;

describe("newsFeedSlice", () => {
  let store: TestStore;

  beforeEach(() => {
    store = createTestStore();
    vi.clearAllMocks();
  });

  it("should have correct initial state", () => {
    const state = store.getState().newsFeed;
    expect(state).toEqual({
      posts: [],
      loading: false,
      error: null,
      hasMore: true,
      skip: 0,
      total: 0,
    });
  });

  it("should reset state to initial values", () => {
    store.dispatch({
      type: "newsFeed/fetchNews/fulfilled",
      payload: mockApiResponse,
    });

    store.dispatch(resetNewsFeed());

    const state = store.getState().newsFeed;
    expect(state.posts).toEqual([]);
    expect(state.skip).toBe(0);
    expect(state.hasMore).toBe(true);
    expect(state.error).toBe(null);
    expect(state.total).toBe(0);
  });

  it("should clear error state", () => {
    store.dispatch({
      type: "newsFeed/fetchNews/rejected",
      payload: "Test error",
    });

    store.dispatch(clearError());

    const state = store.getState().newsFeed;
    expect(state.error).toBe(null);
  });

  it("should fetch posts successfully", async () => {
    mockedNewsApi.fetchPosts.mockResolvedValue(mockApiResponse);

    await store.dispatch(fetchNews({ limit: 10, skip: 0 }));

    const state = store.getState().newsFeed;
    expect(state.loading).toBe(false);
    expect(state.posts).toEqual(mockApiResponse.posts);
    expect(state.skip).toBe(10);
    expect(state.hasMore).toBe(true);
    expect(state.error).toBe(null);
    expect(state.total).toBe(100);
  });

  it("should handle fetch error", async () => {
    mockedNewsApi.fetchPosts.mockRejectedValue(new Error("Network error"));

    await store.dispatch(fetchNews({ limit: 10, skip: 0 }));

    const state = store.getState().newsFeed;
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Network error");
    expect(state.posts).toEqual([]);
  });

  it("should set hasMore to false when all posts are loaded", async () => {
    const limitedResponse = {
      ...mockApiResponse,
      total: 2,
    };

    mockedNewsApi.fetchPosts.mockResolvedValue(limitedResponse);

    await store.dispatch(fetchNews({ limit: 10, skip: 0 }));

    const state = store.getState().newsFeed;
    expect(state.hasMore).toBe(false);
  });

  it("should append new posts to existing ones", async () => {
    mockedNewsApi.fetchPosts.mockResolvedValueOnce(mockApiResponse);

    await store.dispatch(fetchNews({ limit: 10, skip: 0 }));

    const secondResponse = {
      ...mockApiResponse,
      posts: [{ ...mockApiResponse.posts[0], id: 3, title: "Third Post" }],
      skip: 10,
      limit: 10,
    };

    mockedNewsApi.fetchPosts.mockResolvedValueOnce(secondResponse);

    await store.dispatch(fetchNews({ limit: 10, skip: 10 }));

    const state = store.getState().newsFeed;
    expect(state.posts).toHaveLength(3);
    expect(state.skip).toBe(20);
  });

  it("should set loading states correctly", async () => {
    store.dispatch({ type: "newsFeed/fetchNews/pending" });
    let state = store.getState().newsFeed;
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);

    mockedNewsApi.fetchPosts.mockResolvedValue(mockApiResponse);
    await store.dispatch(fetchNews({ limit: 10, skip: 0 }));

    state = store.getState().newsFeed;
    expect(state.loading).toBe(false);
  });

  it("should handle generic error with fallback message", async () => {
    mockedNewsApi.fetchPosts.mockRejectedValue("Some unexpected error");

    await store.dispatch(fetchNews({ limit: 10, skip: 0 }));

    const state = store.getState().newsFeed;
    expect(state.error).toBe(
      "An unexpected error occurred while fetching news"
    );
  });

  it("should preserve existing posts on error", async () => {
    mockedNewsApi.fetchPosts.mockResolvedValueOnce(mockApiResponse);
    await store.dispatch(fetchNews({ limit: 10, skip: 0 }));

    mockedNewsApi.fetchPosts.mockRejectedValue(new Error("Network error"));
    await store.dispatch(fetchNews({ limit: 10, skip: 10 }));

    const state = store.getState().newsFeed;
    expect(state.posts).toEqual(mockApiResponse.posts);
    expect(state.error).toBe("Network error");
  });
});
