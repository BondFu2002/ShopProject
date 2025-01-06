import React, { useEffect, useState } from "react"; // 导入React及其钩子
import {
  Table,
  Button,
  Breadcrumb,
  Popconfirm,
  message,
  Select,
  Input,
} from "antd"; // 导入Ant Design的组件
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons"; // 导入Ant Design图标组件

import { Link } from "react-router-dom"; // 导入Link用于路由导航
import "../../css/Product/ProductList.css"; // 引入自定义样式文件
import apiClient from "../../components/apiClient"; // 导入API客户端

const ProductList = () => {
  const [products, setProducts] = useState([]); // 声明状态变量，存储商品列表
  const [selectedCategory, setSelectedCategory] = useState(""); // 存储选中的分类
  const [searchKeyword, setSearchKeyword] = useState(""); // 存储搜索关键词
  const [categories, setCategories] = useState([]); // 存储商品分类列表
  const { Option } = Select; // 从Select组件中解构出Option
  const { Search } = Input; // 从Input组件中解构出Search

  // 搜索处理函数
  const onSearch = (value) => {
    setSearchKeyword(value); // 更新搜索关键词
    fetchProducts(selectedCategory, value); // 根据分类和关键词获取商品列表
  };

  // 获取分类列表的函数
  const fetchCategories = async () => {
    try {
      const response = await apiClient.get(`/category`); // 发送GET请求以获取分类数据
      setCategories(response.data); // 更新状态以存储获取的分类数据
    } catch (error) {
      console.error("Fetch categories failed:", error); // 记录错误
      message.error("获取分类列表失败，请重试。"); // 提示用户获取失败
    }
  };

  // 组件挂载时获取商品和分类列表
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
        filteredProducts = filteredProducts.filter(
          (item) => item.category.name === category
        );
      }

      // 根据搜索关键词过滤商品
      if (keyword) {
        filteredProducts = filteredProducts.filter(
          (item) =>
            item.name.toLowerCase().includes(keyword.toLowerCase()) || // 商品名称包含关键词
            item.description.toLowerCase().includes(keyword.toLowerCase()) // 商品描述包含关键词
        );
      }

      // 默认按ID升序排序
      filteredProducts.sort((a, b) => a.id - b.id);

      setProducts(filteredProducts); // 更新状态以存储过滤后的商品列表
    } catch (error) {
      console.error(error); // 记录错误
      message.error("获取商品列表失败，请重试。"); // 提示用户获取失败
    }
  };

  // 分类选择变化的处理函数
  const handleCategoryChange = (value) => {
    setSelectedCategory(value); // 更新选中的分类
    fetchProducts(value, searchKeyword); // 根据选择的分类和当前搜索关键词获取商品列表
  };

  // 下架商品的处理函数
  const handlePublish = async (productId) => {
    try {
      const response = await apiClient.patch(`/product/${productId}`, {
        published: false, // 将商品标记为下架
      });

      if (response.status === 200) {
        message.success("商品下架成功"); // 提示用户下架成功
        fetchProducts(selectedCategory, searchKeyword); // 重新获取商品列表
      } else {
        throw new Error("发布下架失败"); // 抛出错误
      }
    } catch (error) {
      message.error("商品下架失败，请重试。"); // 提示用户下架失败
      console.error("Error:", error); // 记录错误
    }
  };

  // 删除商品的处理函数
  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/product/${id}`); // 发送DELETE请求以删除商品
      message.success("商品删除成功"); // 提示用户删除成功
      fetchProducts(selectedCategory, searchKeyword); // 重新获取商品列表
    } catch (error) {
      console.error("Delete category failed:", error); // 记录错误
      message.error("商品删除失败，请重试。"); // 提示用户删除失败
    }
  };

  // 表格列的配置
  const columns = [
    {
      title: "ID", // 列标题
      dataIndex: "id", // 数据字段
      key: "id", // 唯一键
      sorter: (a, b) => a.id - b.id, // 添加排序函数
      defaultSortOrder: 'ascend', // 默认排序方式
    },
    {
      title: "名称", // 列标题
      dataIndex: "name", // 数据字段
      key: "name", // 唯一键
    },
    {
      title: "价格", // 列标题
      dataIndex: "price", // 数据字段
      key: "price", // 唯一键
      render: (price) => `¥${price.toFixed(2)}`, // 格式化价格
      sorter: (a, b) => a.price - b.price, // 添加价格排序
    },
    {
      title: "库存(个)", // 列标题
      dataIndex: "stock", // 数据字段
      key: "stock", // 唯一键
    },
    {
      title: "创建时间", // 列标题
      dataIndex: "createdAt", // 数据字段
      key: "createdAt", // 唯一键
      render: (text) => new Date(text).toLocaleString(), // 格式化创建时间
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt), // 添加时间排序
    },
    {
      title: "更新时间", // 列标题
      dataIndex: "updatedAt", // 数据字段
      key: "updatedAt", // 唯一键
      render: (text) => new Date(text).toLocaleString(), // 格式化更新时间
      sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt), // 添加时间排序
    },
    {
      title: "操作", // 列标题
      key: "action", // 唯一键
      render: (text, record) => ( // 渲染操作列
        <span>
          <Link to={`/product-detail/${record.id}`}> {/* 商品详情链接 */}
            <Button
              type="link"
              icon={<QuestionCircleOutlined />}
              className="edit-button"
            >
              详情
            </Button>
          </Link>
          <Link to={`/product-form/edit/${record.id}`}> {/* 编辑商品链接 */}
            <Button type="link" icon={<EditOutlined />} className="edit-button">
              编辑
            </Button>
          </Link>
          <Popconfirm
            title="是否确认删除？" // 删除确认提示
            okText="删除" // 确认按钮文字
            cancelText="取消" // 取消按钮文字
            onConfirm={() => handleDelete(record.id)} // 确认删除时调用的函数
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
            onClick={() => handlePublish(record.id)} // 下架按钮点击时调用
            danger
            className="unpublish-button"
          >
            下架
          </Button>
        </span>
      ),
    },
  ];

  // 表格变化的处理函数
  const handleTableChange = (pagination, filters, sorter) => {
    // 根据操作维护产品列表
    const { field, order } = sorter; // 从排序器中解构出字段和订单
    if (field) {
      const sortedProducts = [...products].sort((a, b) => {
        if (order === 'ascend') {
          return a[field] > b[field] ? 1 : -1; // 升序排序
        } else if (order === 'descend') {
          return a[field] < b[field] ? 1 : -1; // 降序排序
        }
        return 0; // 未排序时返回0
      });
      setProducts(sortedProducts); // 更新状态以存储排序后的商品列表
    }
  };

  return (
    <div className="product-list-container"> {/* 商品列表容器 */}
      <Breadcrumb className="breadcrumb"> {/* 面包屑导航 */}
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>商品管理</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="page-title">商品列表</h1> {/* 页面标题 */}
      <Search
        className="search-input" // 搜索框样式
        placeholder="输入搜索文本" // 搜索框占位符
        onSearch={onSearch} // 搜索事件处理
        enterButton // 显示搜索按钮
      />
      <Link to="/product-form/create"> {/* 创建商品链接 */}
        <Button
          type="primary"
          className="create-button"
          icon={<PlusOutlined />} // 添加图标
        >
          创建商品
        </Button>
      </Link>
      <div className="category-select"> {/* 分类选择区域 */}
        <span>分类：</span>
        <Select
          style={{ width: 120 }} // 设置选择框宽度
          placeholder="选择类别" // 选择框占位符
          value={selectedCategory} // 当前选择的分类
          onChange={handleCategoryChange} // 分类选择变化事件
        >
          <Option value="">全部</Option> {/* 全部选项 */}
          {categories.map((category) => ( // 渲染每个分类选项
            <Option key={category.id} value={category.name}>
              {category.name}
            </Option>
          ))}
        </Select>
      </div>
      <Table
        columns={columns} // 表格列配置
        dataSource={products} // 表格数据源
        rowKey="id" // 每行的唯一键
        pagination={{
          showSizeChanger: true, // 显示页面大小改变器
          defaultPageSize: 5, // 默认每页显示5条
          pageSizeOptions: ["5", "10"], // 每页显示条数的选择
        }}
        onChange={handleTableChange} // 注册表格变化的处理函数
      />
    </div>
  );
};

export default ProductList; // 导出ProductList组件
