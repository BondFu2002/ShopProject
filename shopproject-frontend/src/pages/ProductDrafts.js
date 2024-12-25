import React, { useEffect, useState } from "react";
import { Table, Button, Breadcrumb, Popconfirm, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/ProductList.css"; // 和商品页面共用样式表

const ProductDrafts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/product/drafts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error(error);
      message.error("获取未发布的商品列表失败，请重试。");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePublish = async (productId) => {
    try {
      const response = await axios.patch(
        `/product/${productId}`,
        {
          published: true,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      if (response.status === 200) {
        message.success("商品发布成功");
        // 重新获取已发布的商品列表
        fetchProducts();
      } else {
        throw new Error("发布发布失败");
      }
    } catch (error) {
      message.error("商品发布失败，请重试。");
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/product/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });

      message.success("商品删除成功");
      fetchProducts();
    } catch (error) {
      console.error("Delete category failed:", error);
      message.error("商品删除失败，请重试。");
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
      title: "库存(个)",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "商品描述",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <span>
          <Link to={`/product-detail/${record.id}`}>
            <Button
              type="link"
              icon={<QuestionCircleOutlined />}
              className="edit-button"
            >
              详情
            </Button>
          </Link>
          <Link to={`/product-form/edit/${record.id}`}>
            <Button type="link" icon={<EditOutlined />} className="edit-button">
              编辑
            </Button>
          </Link>
          <Popconfirm
            title="是否确认删除？"
            okText="删除"
            cancelText="取消"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button
              type="link"
              icon={<DeleteOutlined />}
              className="delete-button"
            >
              删除
            </Button>
          </Popconfirm>
          <Button type="primary" onClick={() => handlePublish(record.id)}>
            发布
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div className="product-list-container">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>还未发布</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="page-title">未发布商品列表</h1>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 5,
          pageSizeOptions: ["5", "10"],
        }}
      />
    </div>
  );
};

export default ProductDrafts;
