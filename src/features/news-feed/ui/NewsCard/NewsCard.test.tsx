import { describe, it, expect } from "vitest";
import { mockNewsPost } from "@/test-utils/mocks";
import { render, screen } from "@/test-utils/test-utils";
import NewsCard from "./NewsCard";

describe("NewsCard", () => {
  it("renders news card with all content", () => {
    render(<NewsCard post={mockNewsPost} />);

    expect(screen.getByText(mockNewsPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockNewsPost.body)).toBeInTheDocument();

    mockNewsPost.tags.forEach((tag: string) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });

    expect(
      screen.getByText(mockNewsPost.reactions.likes.toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockNewsPost.reactions.dislikes.toString())
    ).toBeInTheDocument();

    const totalReactions =
      mockNewsPost.reactions.likes + mockNewsPost.reactions.dislikes;
    expect(
      screen.getByText(`Total reactions: ${totalReactions}`)
    ).toBeInTheDocument();
  });

  it("renders views when provided", () => {
    render(<NewsCard post={mockNewsPost} />);

    if (mockNewsPost.views) {
      expect(
        screen.getByText(mockNewsPost.views.toString())
      ).toBeInTheDocument();
    }
  });

  it("handles long titles with ellipsis", () => {
    const longTitlePost = {
      ...mockNewsPost,
      title:
        "This is a very long title that should be truncated with ellipsis when it exceeds the maximum width",
    };

    render(<NewsCard post={longTitlePost} />);

    expect(screen.getByText(longTitlePost.title)).toBeInTheDocument();
  });

  it("truncates body to 3 lines", () => {
    const longBodyPost = {
      ...mockNewsPost,
      body: "This is a very long body text that should be truncated to exactly three lines when displayed in the news card component. It contains multiple sentences and should demonstrate the ellipsis behavior properly.",
    };

    render(<NewsCard post={longBodyPost} />);

    expect(screen.getByText(longBodyPost.body)).toBeInTheDocument();
  });
});
