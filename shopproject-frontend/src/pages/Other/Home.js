import React, { useEffect, useState } from "react"; // 导入React及其所需钩子
import { Table, Breadcrumb, Input, Select, message, Button } from "antd"; // 导入Ant Design组件
import { Link } from "react-router-dom"; // 导入Link用于导航
import { QuestionCircleOutlined } from "@ant-design/icons"; // 导入图标

import "../../css/Other/Home.css"; // 引入自定义CSS文件
import apiClient from "../../components/apiClient"; // 导入API客户端用于进行网络请求

const Home = () => {
  // 声明状态变量
  const [products, setProducts] = useState([]); // 存储商品列表
  const [selectedCategory, setSelectedCategory] = useState(""); // 存储选中的分类
  const [searchKeyword, setSearchKeyword] = useState(""); // 存储搜索关键词
  const { Option } = Select; // 从Select组件中解构出Option
  const [categories, setCategories] = useState([]); // 存储分类列表
  const { Search } = Input; // 从Input组件中解构出Search

  // 执行搜索操作
  const onSearch = (value) => {
    setSearchKeyword(value); // 更新搜索关键词
    fetchProducts(selectedCategory, value); // 根据分类和关键词搜索商品
  };

  // 获取分类列表的函数
  const fetchCategories = async () => {
    try {
      const response = await apiClient.get(`/category`); // 发送GET请求获取分类数据
      setCategories(response.data); // 更新分类状态
    } catch (error) {
      console.error("Fetch categories failed:", error); // 记录错误
      message.error("获取分类列表失败，请重试。"); // 提示错误信息
    }
  };

  // 组件加载时获取商品列表和分类列表
  useEffect(() => {
    fetchProducts(); // 获取商品列表
    fetchCategories(); // 获取分类列表
  }, []);

  // 获取商品列表的函数，支持分类和关键词过滤
  const fetchProducts = async (category = "", keyword = "") => {
    try {
      const response = await apiClient.get("/product"); // 发送GET请求获取商品数据

      let filteredProducts = response.data; // 初始商品列表

      // 根据分类过滤商品
      if (category) {
        filteredProducts = filteredProducts.filter((item) => item.category.name === category);
      }

      // 根据搜索关键词过滤商品
      if (keyword) {
        filteredProducts = filteredProducts.filter((item) =>
          item.name.toLowerCase().includes(keyword.toLowerCase()) || // 商品名称包含关键词
          item.description.toLowerCase().includes(keyword.toLowerCase()) // 商品描述包含关键词
        );
      }

      setProducts(filteredProducts); // 更新状态以存储过滤后的商品列表
    } catch (error) {
      console.error(error); // 记录错误
      message.error("获取商品列表失败，请重试。"); // 提示错误信息
    }
  };

  // 处理分类选择变化
  const handleCategoryChange = (value) => {
    setSelectedCategory(value); // 更新选中的分类
    fetchProducts(value, searchKeyword); // 根据选中的分类和搜索关键词获取商品
  };

  // 定义表格列信息
  const columns = [
    {
      title: "商品名称", // 列标题
      dataIndex: "name", // 数据对应的字段名称
      key: "name", // 唯一键
    },
    {
      title: "价格", // 列标题
      dataIndex: "price", // 数据对应的字段名称
      key: "price", // 唯一键
      render: (price) => `¥${price.toFixed(2)}`, // 格式化价格为人民币格式
      sorter: (a, b) => a.price - b.price, // 添加价格排序
      sortDirections: ['ascend', 'descend'], // 支持升序和降序
    },
    {
      title: "库存", // 列标题
      dataIndex: "stock", // 数据对应的字段名称
      key: "stock", // 唯一键
      render: (stock) => `${stock} 个`, // 格式化库存显示
    },
    {
      title: "详情", // 列标题
      key: "action", // 唯一键
      render: (text, record) => (
        <Link to={`/product-detail/${record.id}`}> {/* 点击查看详情链接 */}
          <Button type="link" icon={<QuestionCircleOutlined />} className="detail-button">
            查看详情
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="user-product-list-container"> {/* 主容器 */}
      <Breadcrumb className="breadcrumb"> {/* 面包屑导航 */}
        <Breadcrumb.Item>首页</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="page-title">商品总览</h1> {/* 页面标题 */}
      <div className="search-and-category"> {/* 搜索和分类选择区域 */}
        <Search
          className="search-input" // 搜索框样式
          placeholder="搜索商品" // 搜索框占位符
          onSearch={onSearch} // 搜索事件处理
          enterButton // 显示搜索按钮
        />
        <Select
          className="category-select" // 分类选择框样式
          style={{ width: 120 }} // 设置分类选择框宽度
          placeholder="选择分类" // 分类选择框占位符
          value={selectedCategory} // 设置当前选中的分类
          onChange={handleCategoryChange} // 分类选择变化事件处理
          allowClear // 允许清除选择
        >
          <Option value="">全部</Option> {/* 允许选择全部商品 */}
          {categories.map((category) => (
            <Option key={category.id} value={category.name}> {/* 渲染每个分类选项 */}
              {category.name}
            </Option>
          ))}
        </Select>
      </div>
      <Table
        columns={columns} // 表格列配置
        dataSource={products} // 表格数据源
        rowKey="id" // 指定每行的唯一键
        pagination={{
          showSizeChanger: true, // 显示页面大小改变器
          defaultPageSize: 5, // 默认每页显示5条
          pageSizeOptions: ["5", "10"], // 每页显示条数的选择
        }}
        bordered // 显示边框
      />
    </div>
  );
};

export default Home; // 导出Home组件
