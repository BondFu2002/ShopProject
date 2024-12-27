import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Breadcrumb,
  Popconfirm,
  message,
  Select,
  Input,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import "../../css/Product/ProductList.css"; // 引入 CSS 文件
import apiClient from "../../components/apiClient";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [categories, setCategories] = useState([]);
  const { Option } = Select;
  const { Search } = Input;

  const onSearch = (value) => {
    setSearchKeyword(value);
    fetchProducts(selectedCategory, value);
  };

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get(`/category`);
      setCategories(response.data);
    } catch (error) {
      console.error("Fetch categories failed:", error);
      message.error("获取分类列表失败，请重试。");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async (category = "", keyword = "") => {
    try {
      const response = await apiClient.get("/product");
      let filteredProducts = response.data;

      if (category) {
        filteredProducts = filteredProducts.filter(
          (item) => item.category.name === category
        );
      }

      if (keyword) {
        filteredProducts = filteredProducts.filter(
          (item) =>
            item.name.toLowerCase().includes(keyword.toLowerCase()) ||
            item.description.toLowerCase().includes(keyword.toLowerCase())
        );
      }

      // 默认按ID升序排序
      filteredProducts.sort((a, b) => a.id - b.id);

      setProducts(filteredProducts);
    } catch (error) {
      console.error(error);
      message.error("获取商品列表失败，请重试。");
    }
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    fetchProducts(value, searchKeyword);
  };

  const handlePublish = async (productId) => {
    try {
      const response = await apiClient.patch(`/product/${productId}`, {
        published: false,
      });

      if (response.status === 200) {
        message.success("商品下架成功");
        fetchProducts(selectedCategory, searchKeyword);
      } else {
        throw new Error("发布下架失败");
      }
    } catch (error) {
      message.error("商品下架失败，请重试。");
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/product/${id}`);
      message.success("商品删除成功");
      fetchProducts(selectedCategory, searchKeyword);
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
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: 'ascend', // 默认排序
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
      sorter: (a, b) => a.price - b.price,
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
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => new Date(text).toLocaleString(),
      sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
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
          <Button
            type="primary"
            onClick={() => handlePublish(record.id)}
            danger
            className="unpublish-button"
          >
            下架
          </Button>
        </span>
      ),
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    // 根据操作维护产品列表
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
        <Breadcrumb.Item>商品管理</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="page-title">商品列表</h1>
      <Search
        className="search-input"
        placeholder="输入搜索文本"
        onSearch={onSearch}
        enterButton
      />
      <Link to="/product-form/create">
        <Button
          type="primary"
          className="create-button"
          icon={<PlusOutlined />}
        >
          创建商品
        </Button>
      </Link>
      <div className="category-select">
        <span>分类：</span>
        <Select
          style={{ width: 120 }}
          placeholder="选择类别"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <Option value="">全部</Option>
          {categories.map((category) => (
            <Option key={category.id} value={category.name}>
              {category.name}
            </Option>
          ))}
        </Select>
      </div>
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

export default ProductList;
