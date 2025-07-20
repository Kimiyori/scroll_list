import NewsFeedList from "@/features/news-feed/ui/NewsFeedList/NewsFeedList";
import { Layout } from "@/shared/ui/Layout/Layout";

const HomePage = () => {
  return (
    <Layout title="Latest News">
      <NewsFeedList />
    </Layout>
  );
};

export default HomePage;
