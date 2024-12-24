import React from "react";
import { Layout, Typography } from "antd";
import "../css/Home.css"; // 用于引入自定义的CSS样式

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const Home = () => {
  return (
    <Layout className="home-layout">
      <Content className="home-content">
        <div className="home-card">
          <Title level={1} className="home-section-title">
            关于我们
          </Title>
          <Paragraph className="home-paragraph">
            这是一个强大的电商商品管理系统首页界面，旨在为您提供卓越的管理体验。
          </Paragraph>
          <Title level={1} className="home-section-title">
            我们的服务
          </Title>
          <Paragraph className="home-paragraph">
            功能包括：
            <br />
            - 用户管理
            <br />
            - 商品管理
            <br />- 分类管理
          </Paragraph>
          <Title level={1} className="home-section-title">
            联系我们
          </Title>
          <Paragraph className="home-paragraph">
            如果您有任何问题或建议，请通过以下方式联系我们：
            <br />
            电子邮件: 1404933162@qq.com
            <br />
            电话: 18382485624
          </Paragraph>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
