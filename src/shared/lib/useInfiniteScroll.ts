import { useEffect, useCallback, useRef } from "react";
import { API_CONSTANTS } from "@/shared/const";

interface UseInfiniteScrollOptions {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  threshold?: number;
}

export const useInfiniteScroll = ({
  hasMore,
  isLoading,
  onLoadMore,
  threshold = API_CONSTANTS.INFINITE_SCROLL_THRESHOLD,
}: UseInfiniteScrollOptions) => {
  const loaderRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!loaderRef.current || isLoading || !hasMore) return;

    const { bottom } = loaderRef.current.getBoundingClientRect();
    if (bottom <= window.innerHeight + threshold) {
      onLoadMore();
    }
  }, [isLoading, hasMore, onLoadMore, threshold]);

  useEffect(() => {
    const initializeScroll = () => {
      window.scrollTo(0, 0);
    };

    const timeoutId = setTimeout(
      initializeScroll,
      API_CONSTANTS.SCROLL_INIT_DELAY
    );

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    let throttleTimer: number | null = null;

    const throttledScrollHandler = () => {
      if (throttleTimer) return;

      throttleTimer = window.setTimeout(() => {
        handleScroll();
        throttleTimer = null;
      }, 16);
    };

    window.addEventListener("scroll", throttledScrollHandler, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
      if (throttleTimer) {
        clearTimeout(throttleTimer);
      }
    };
  }, [handleScroll]);

  return loaderRef;
};
