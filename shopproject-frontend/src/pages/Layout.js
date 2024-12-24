import { Outlet , useNavigate } from "react-router-dom";
import { Layout, Menu, Popconfirm } from "antd";
import {
  LogoutOutlined,
  ShoppingOutlined,
  TableOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "../css/Layout.css";


const { Header, Sider } = Layout;

const items = [
    {
        label: "首页",
        key: "",
        icon: <HomeOutlined />,
    },
  {
    label: "商品管理",
    key: "product-list",
    icon: <ShoppingOutlined />,
  },
  {
    label: "分类管理",
    key: "category-list",
    icon: <TableOutlined />,
  },
];

const ShopLayout = () => {
  const navigate = useNavigate();
  const menuClick = (route) => {
    navigate(route.key);
  };
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">BOND</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["1"]}
            items={items}
            style={{ height: "100%", borderRight: 0 }}
            onClick={menuClick}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ShopLayout;
