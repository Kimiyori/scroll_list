import { LikeOutlined, DislikeOutlined, EyeOutlined } from "@ant-design/icons";
import { Card, Tag, Typography, Space, Tooltip } from "antd";
import { memo, FC } from "react";
import { NewsPost } from "@/entities/news";
import { UI_CONSTANTS } from "@/shared/const";
import "./NewsCard.css";

const { Title, Paragraph } = Typography;

interface NewsCardProps {
  post: NewsPost;
}

const NewsCard: FC<NewsCardProps> = memo(({ post }) => {
  const { title, body, tags, reactions, views } = post;

  const totalReactions = reactions.likes + reactions.dislikes;

  return (
    <Card className="news-card" hoverable>
      <div className="news-card-header">
        <Title
          level={4}
          className="news-card-title"
          ellipsis={{ tooltip: title }}
        >
          {title}
        </Title>
      </div>

      <Paragraph
        className="news-card-body"
        ellipsis={{
          rows: UI_CONSTANTS.NEWS_CARD_BODY_MAX_LINES,
          expandable: false,
        }}
      >
        {body}
      </Paragraph>

      <div className="news-card-tags">
        {tags.map(tag => (
          <Tag key={tag} color="blue">
            {tag}
          </Tag>
        ))}
      </div>

      <div className="news-card-footer">
        <Space size="large">
          <Tooltip
            title={`${reactions.likes} likes, ${reactions.dislikes} dislikes`}
          >
            <Space>
              <LikeOutlined />
              <span>{reactions.likes}</span>
              <DislikeOutlined />
              <span>{reactions.dislikes}</span>
            </Space>
          </Tooltip>

          {views && (
            <Tooltip title="Views">
              <Space>
                <EyeOutlined />
                <span>{views}</span>
              </Space>
            </Tooltip>
          )}

          <span className="total-reactions">
            Total reactions: {totalReactions}
          </span>
        </Space>
      </div>
    </Card>
  );
});

export default NewsCard;
