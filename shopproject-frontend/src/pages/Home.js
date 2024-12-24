import React from 'react';
import { Layout, Typography } from 'antd';
import '../css/Home.css'; // 用于引入自定义的CSS样式

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const Home = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#40a9ff', padding: 0 }}>
        <Title level={2} style={{ color: 'white', textAlign: 'center', padding: '16px 0' }}>
          欢迎来到我的网站
        </Title>
      </Header>
      <Content style={{ padding: '50px 20px', background: '#e6f7ff' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 380, border: '1px solid #d9d9d9', borderRadius: 8 }}>
          <Title level={3}>关于我们</Title>
          <Paragraph>
            这是一个简单的电商商品管理系统首页界面
          </Paragraph>
          <Title level={3}>我们的服务</Title>
          <Paragraph>
            功能包括：用户管理，商品管理，分类管理
          </Paragraph>
          <Title level={3}>联系我们</Title>
          <Paragraph>
            如果您有任何问题或建议，请通过以下方式联系我们：
          </Paragraph>
          <Text>电子邮件: 1404933162@qq.com</Text><br />
          <Text>电话: 18382485624</Text>
        </div>
      </Content>
      <Footer style={{ background: '#40a9ff', color: 'white', textAlign: 'center', padding: '16px 0' }}>
        create by BondFu
      </Footer>
    </Layout>
  );
};

export default Home;
