export interface NewsPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  userId: number;
  views?: number;
}

export interface NewsApiResponse {
  posts: NewsPost[];
  total: number;
  skip: number;
  limit: number;
}

export interface NewsState {
  posts: NewsPost[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  skip: number;
  total: number;
}
