import { Spin } from "antd";
import { FC } from "react";
import "./LoadingSpinner.css";

interface LoadingSpinnerProps {
  size?: "small" | "default" | "large";
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ size = "default" }) => {
  return (
    <div className="loading-spinner-container">
      <Spin size={size} data-testid="loading-spinner" />
    </div>
  );
};

export default LoadingSpinner;
