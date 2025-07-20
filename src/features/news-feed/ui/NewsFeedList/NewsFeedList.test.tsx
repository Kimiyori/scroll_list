import { screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { newsApi } from "@/shared/api/news";
import { mockApiResponse, mockEmptyApiResponse } from "@/test-utils/mocks";
import { render } from "@/test-utils/test-utils";
import NewsFeedList from "./NewsFeedList";

vi.mock("@/shared/api/news");
const mockedNewsApi = vi.mocked(newsApi);

describe("NewsFeedList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays news cards when data is loaded", async () => {
    mockedNewsApi.fetchPosts.mockResolvedValue(mockApiResponse);

    render(<NewsFeedList />);

    await waitFor(() => {
      expect(screen.getByText("Test News Title")).toBeInTheDocument();
    });

    expect(screen.getByText(/This is a test news body/)).toBeInTheDocument();
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("news")).toBeInTheDocument();
  });

  it("handles loading state", () => {
    mockedNewsApi.fetchPosts.mockImplementation(() => new Promise(() => {}));

    render(<NewsFeedList />);

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("shows empty state when no news found", async () => {
    mockedNewsApi.fetchPosts.mockResolvedValue(mockEmptyApiResponse);

    render(<NewsFeedList />);

    await waitFor(
      () => {
        expect(screen.getByText("No news found")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
