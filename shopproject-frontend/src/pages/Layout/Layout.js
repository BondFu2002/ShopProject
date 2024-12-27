import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, Popconfirm } from "antd";
import {
  LogoutOutlined,
  ShoppingOutlined,
  TableOutlined,
  HomeOutlined,
  UserOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import "../../css/Layout/Layout.css";


const { Header, Sider } = Layout;

const ShopLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

  // 当 localStorage 中的 userRole 变化时更新状态
  useEffect(() => {
    const handleStorageChange = () => {
      setUserRole(localStorage.getItem("userRole"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const items = [
    {
      label: "首页",
      key: "",
      icon: <HomeOutlined />,
    },
    ...(userRole === "ADMIN" || userRole === "NORMAL"
      ? [
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
          {
            label: "还未发布",
            key: "product-drafts",
            icon: <ShoppingOutlined />,
          },
          {
            label: "用户管理",
            key: "user-list",
            icon: <UserOutlined />,
          },
          ...(userRole === "ADMIN"
            ? [
                {
                  label: "修改权限密码",
                  key: "admin-password-reset",
                  icon: <InfoCircleOutlined />,
                },
              ]
            : []),
        ]
      : []),
  ];

  const menuClick = (route) => {
    navigate(route.key);
  };
  
  const selectedKey = location.pathname;

  // 定义退出操作
  const handleLogout = () => {
    // 清除 JWT 令牌
    localStorage.clear();
    // 导航到登录页面
    navigate("/login");
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">
            Hi! {localStorage.getItem("userName")}{" "}
            <span className="user-role">
              ({userRole})
            </span>
          </span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={handleLogout}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="light"
            SelectedKeys={[selectedKey]} // 修复为 selectedKeys 而不是 SelectedKeys
            items={items}
            style={{ height: "100%", borderRight: 0 }}
            onClick={menuClick}
          />
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ShopLayout;
