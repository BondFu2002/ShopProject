import React, { useEffect, useState } from "react";
import { Table, Button, Breadcrumb, Popconfirm, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import "../../css/Product/ProductList.css"; // 和商品页面共用样式表
import apiClient from "../../components/apiClient";

const ProductDrafts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await apiClient.get("/product/drafts");
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
      const response = await apiClient.patch(`/product/${productId}`, {
        published: true,
      });

      if (response.status === 200) {
        message.success("商品发布成功");
        // 重新获取已发布的商品列表
        fetchProducts();
      } else {
        throw new Error("发布失败");
      }
    } catch (error) {
      message.error("商品发布失败，请重试。");
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/product/${id}`);

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
      sorter: (a, b) => a.id - b.id, // 添加排序函数
      defaultSortOrder: 'ascend', // 默认排序为升序
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
      sorter: (a, b) => a.price - b.price, // 添加排序
    },
    {
      title: "库存(个)",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleString(),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt), // 添加排序
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => new Date(text).toLocaleString(),
      sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt), // 添加排序
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
          <Button type="primary" onClick={() => handlePublish(record.id)} className="publish-button">
            发布
          </Button>
        </span>
      ),
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    const { field, order } = sorter;
    if (field) {
      const sortedProducts = [...products].sort((a, b) => {
        if (order === 'ascend') {
          return a[field] > b[field] ? 1 : -1;
        } else if (order === 'descend') {
          return a[field] < b[field] ? 1 : -1;
        }
        return 0;
      });
      setProducts(sortedProducts);
    }
  };

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
        onChange={handleTableChange} // 注册表格变化的处理函数
      />
    </div>
  );
};

export default ProductDrafts;
