import { configureStore } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import { ConfigProvider } from "antd";
import { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import newsFeedReducer from "@/features/news-feed/model/newsFeedSlice";

const createTestStore = (preloadedState?: unknown) => {
  return configureStore({
    reducer: {
      newsFeed: newsFeedReducer,
    },
    preloadedState,
  });
};

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  preloadedState?: unknown;
  store?: ReturnType<typeof createTestStore>;
}

const customRender = (
  ui: ReactElement,
  {
    preloadedState,
    store = createTestStore(preloadedState),
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <ConfigProvider>
        <Provider store={store}>{children}</Provider>
      </ConfigProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from "@testing-library/react";
export { customRender as render, createTestStore };
