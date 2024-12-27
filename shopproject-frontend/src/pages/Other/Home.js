import React, { useEffect, useState } from "react";
import { Table, Breadcrumb, Input, Select, message, Button } from "antd";
import { Link } from "react-router-dom";
import { QuestionCircleOutlined } from "@ant-design/icons";

import "../../css/Other/Home.css"; // 引入 CSS 文件
import apiClient from "../../components/apiClient";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { Option } = Select;
  const [categories, setCategories] = useState([]);
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
        filteredProducts = filteredProducts.filter((item) => item.category.name === category);
      }

      if (keyword) {
        filteredProducts = filteredProducts.filter((item) =>
          item.name.toLowerCase().includes(keyword.toLowerCase()) ||
          item.description.toLowerCase().includes(keyword.toLowerCase())
        );
      }

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

  const columns = [
    {
      title: "商品名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price",
      render: (price) => `¥${price.toFixed(2)}`,
      sorter: (a, b) => a.price - b.price, // 添加价格排序
      sortDirections: ['ascend', 'descend'], // 支持升序和降序
    },
    {
      title: "库存",
      dataIndex: "stock",
      key: "stock",
      render: (stock) => `${stock} 个`,
    },
    {
      title: "详情",
      key: "action",
      render: (text, record) => (
        <Link to={`/product-detail/${record.id}`}>
          <Button type="link" icon={<QuestionCircleOutlined />} className="detail-button">
            查看详情
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="user-product-list-container">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>首页</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="page-title">商品总览</h1>
      <div className="search-and-category">
        <Search
          className="search-input"
          placeholder="搜索商品"
          onSearch={onSearch}
          enterButton
        />
        <Select
          className="category-select"
          style={{ width: 120 }}
          placeholder="选择分类"
          value={selectedCategory}
          onChange={handleCategoryChange}
          allowClear
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
        bordered
      />
    </div>
  );
};

export default Home;
