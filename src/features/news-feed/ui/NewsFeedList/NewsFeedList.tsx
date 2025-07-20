import { Alert, Button, Empty } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import {
  clearError,
  fetchNews,
} from "@/features/news-feed/model/newsFeedSlice";
import NewsCard from "@/features/news-feed/ui/NewsCard/NewsCard";
import { API_CONSTANTS } from "@/shared/const";
import { useInfiniteScroll } from "@/shared/lib/useInfiniteScroll";
import LoadingSpinner from "@/shared/ui/LoadingSpinner/LoadingSpinner";
import "./NewsFeedList.css";

const NewsFeedList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error, hasMore, skip } = useSelector(
    (state: RootState) => state.newsFeed
  );

  //Нету смысла оборачивать, т.к. в текущих условиях он и так будет ререндериться при каждом прокрутке
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadMore = () => {
    if (hasMore && !loading) {
      dispatch(fetchNews({ limit: API_CONSTANTS.POSTS_PER_PAGE, skip }));
    }
  };

  const loaderRef = useInfiniteScroll({
    hasMore,
    isLoading: loading,
    onLoadMore: loadMore,
  });

  useEffect(() => {
    const isInitialLoad = posts.length === 0 && !loading && !error && hasMore;
    if (isInitialLoad) {
      loadMore();
    }
  }, [posts.length, loading, error, hasMore, loadMore]);

  const handleRetry = () => {
    dispatch(clearError());
    loadMore();
  };

  const showEndMessage = !hasMore && posts.length > 0;
  const showNotFoundMessage = !loading && posts.length === 0;
  const showErrorAlert = error && posts.length === 0;

  if (showErrorAlert) {
    return (
      <div className="news-feed-error">
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          action={
            <Button size="small" danger onClick={handleRetry}>
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  if (showNotFoundMessage) {
    return (
      <div className="news-feed-empty">
        <Empty
          description="No news found"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }

  return (
    <div className="news-feed-list">
      {posts.map(post => (
        <NewsCard key={post.id} post={post} />
      ))}

      <div ref={loaderRef} className="news-feed-loader">
        {loading && <LoadingSpinner />}
        {showEndMessage && (
          <div className="news-feed-end">
            <p>You've reached the end of the news feed!</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default NewsFeedList;
