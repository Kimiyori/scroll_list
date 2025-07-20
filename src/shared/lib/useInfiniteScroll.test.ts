import { renderHook } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useInfiniteScroll } from "./useInfiniteScroll";

// Mock IntersectionObserver
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })),
});

describe("useInfiniteScroll", () => {
  const mockOnLoadMore = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return a ref", () => {
    const { result } = renderHook(() =>
      useInfiniteScroll({
        hasMore: true,
        isLoading: false,
        onLoadMore: mockOnLoadMore,
      })
    );

    expect(result.current).toBeDefined();
    expect(typeof result.current).toBe("object");
  });

  it("should handle options correctly", () => {
    const { result } = renderHook(() =>
      useInfiniteScroll({
        hasMore: false,
        isLoading: true,
        onLoadMore: mockOnLoadMore,
        threshold: 0.8,
      })
    );

    expect(result.current).toBeDefined();
  });

  it("should not crash on unmount", () => {
    const { unmount } = renderHook(() =>
      useInfiniteScroll({
        hasMore: true,
        isLoading: false,
        onLoadMore: mockOnLoadMore,
      })
    );

    expect(() => unmount()).not.toThrow();
  });
});
