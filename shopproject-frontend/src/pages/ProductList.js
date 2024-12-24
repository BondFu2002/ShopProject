import React, { useEffect, useState } from "react";
import { Layout, Table, Button, Space, Breadcrumb } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import openNotificationWithIcon from "../utils/notification";
import "../css/ProductList.css"; // 引入CSS文件

const { Content } = Layout;

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/product"); // 注意这里没有前缀 /api
      setProducts(response.data);
    } catch (error) {
      console.error(error);
      openNotificationWithIcon("error", "获取商品列表失败", "请重试。");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePublish = async (productId) => {
    try {
      const response = await axios.patch(`/product/${productId}`, {
        published: false,
      });
      if (response.status === 200) {
        openNotificationWithIcon("success", "商品下架成功");
        // 重新获取已发布的商品列表
        fetchProducts();
      } else {
        throw new Error("发布下架失败");
      }
    } catch (error) {
      openNotificationWithIcon("error", "商品下架失败", "请重试。");
      console.error("Error:", error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price",
      render: (price) => `¥${price.toFixed(2)}`,
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/product-detail/${record.id}`}>详情</Link>
          <Link to={`/product-form/edit/${record.id}`}>编辑</Link>
          <Button type="primary" onClick={() => handlePublish(record.id)}>
            下架
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>商品管理</Breadcrumb.Item>
      </Breadcrumb>
      <Content className="content">
        <Space direction="vertical" style={{ width: "100%" }}>
          <h1 className="page-title">商品列表</h1>
          <Link to="/product-form/create">
            <Button type="primary" className="create-button">
              创建商品
            </Button>
          </Link>
          <Table
            dataSource={products}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Space>
      </Content>
    </Layout>
  );
};

export default ProductList;
