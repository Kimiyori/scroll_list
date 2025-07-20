import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import HomePage from "@/pages/home/HomePage";
import { antdTheme } from "@/shared/theme/theme";
import ErrorBoundary from "@/shared/ui/ErrorBoundary/ErrorBoundary";
import { store } from "./store";

const App = () => {
  return (
    <ErrorBoundary>
      <ConfigProvider theme={antdTheme}>
        <Provider store={store}>
          <HomePage />
        </Provider>
      </ConfigProvider>
    </ErrorBoundary>
  );
};

export default App;
