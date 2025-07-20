import { Alert, Button } from "antd";
import { Component, ErrorInfo, ReactNode } from "react";
import "./ErrorBoundary.css";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);

    this.setState({ errorInfo });

    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary-container">
          <Alert
            message="Something went wrong"
            description={
              this.state.error?.message || "An unexpected error occurred"
            }
            type="error"
            showIcon
            action={
              <Button type="primary" onClick={this.handleRetry}>
                Try Again
              </Button>
            }
            className="error-boundary-alert"
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
