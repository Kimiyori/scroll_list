import axios from "axios";
import { NewsApiResponse } from "@/entities/news";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const newsApi = {
  async fetchPosts(
    limit: number = 10,
    skip: number = 0
  ): Promise<NewsApiResponse> {
    try {
      const { data } = await api.get<NewsApiResponse>(`/posts`, {
        params: { limit, skip },
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ||
            `Request failed: ${error.response?.status || "Network Error"}`
        );
      }
      throw new Error("An unexpected error occurred");
    }
  },
};
