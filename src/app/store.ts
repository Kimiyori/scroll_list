import { configureStore } from "@reduxjs/toolkit";
import newsFeedReducer from "@/features/news-feed/model/newsFeedSlice";

export const store = configureStore({
  reducer: {
    newsFeed: newsFeedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
