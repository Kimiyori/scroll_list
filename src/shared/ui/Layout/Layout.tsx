import { Layout as AntLayout } from "antd";
import "./Layout.css";
import { FC, ReactNode } from "react";

const { Header, Content } = AntLayout;

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export const Layout: FC<LayoutProps> = ({ children, title = "News Feed" }) => {
  return (
    <AntLayout className="app-layout">
      <Header className="app-header">
        <h1 className="app-title">{title}</h1>
      </Header>
      <Content className="app-content">
        <div className="content-container">{children}</div>
      </Content>
    </AntLayout>
  );
};
