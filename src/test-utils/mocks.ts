import { NewsPost, NewsApiResponse } from "@/entities/news";

export const mockNewsPost: NewsPost = {
  id: 1,
  title: "Test News Title",
  body: "This is a test news body with some content to display in the card.",
  tags: ["test", "news", "sample"],
  reactions: {
    likes: 10,
    dislikes: 2,
  },
  userId: 1,
  views: 100,
};

export const mockNewsPost2: NewsPost = {
  id: 2,
  title: "Another Test News",
  body: "This is another test news article with different content.",
  tags: ["technology", "update"],
  reactions: {
    likes: 5,
    dislikes: 1,
  },
  userId: 2,
  views: 50,
};

export const mockApiResponse: NewsApiResponse = {
  posts: [mockNewsPost, mockNewsPost2],
  total: 100,
  skip: 0,
  limit: 10,
};

export const mockEmptyApiResponse: NewsApiResponse = {
  posts: [],
  total: 0,
  skip: 0,
  limit: 10,
};
