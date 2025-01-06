import React, { useEffect, useState } from "react"; // 导入React及其功能
import { Table, Button, Breadcrumb, Popconfirm, message } from "antd"; // 导入Ant Design的组件
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons"; // 导入图标组件

import { Link } from "react-router-dom"; // 导入Link用于路由导航
import "../../css/Product/ProductList.css"; // 引入商品相关的样式表
import apiClient from "../../components/apiClient"; // 导入API客户端用于进行请求

const ProductDrafts = () => {
  const [products, setProducts] = useState([]); // 状态变量，用于存储未发布的商品列表

  // 获取未发布商品列表的函数
  const fetchProducts = async () => {
    try {
      const response = await apiClient.get("/product/drafts"); // 发送GET请求，获取未发布商品
      setProducts(response.data); // 更新状态以存储商品列表
    } catch (error) {
      console.error(error); // 记录错误
      message.error("获取未发布的商品列表失败，请重试。"); // 提示用户错误信息
    }
  };

  // 组件加载时获取未发布商品列表
  useEffect(() => {
    fetchProducts(); // 调用获取商品列表的函数
  }, []);

  // 发布商品的处理函数
  const handlePublish = async (productId) => {
    try {
      const response = await apiClient.patch(`/product/${productId}`, {
        published: true, // 设置商品为已发布状态
      });

      if (response.status === 200) {
        message.success("商品发布成功"); // 提示发布成功
        fetchProducts(); // 重新获取商品列表
      } else {
        throw new Error("发布失败"); // 抛出发布失败的错误
      }
    } catch (error) {
      message.error("商品发布失败，请重试。"); // 提示发布失败
      console.error("Error:", error); // 记录错误
    }
  };

  // 删除商品的处理函数
  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/product/${id}`); // 发送DELETE请求以删除商品

      message.success("商品删除成功"); // 提示删除成功
      fetchProducts(); // 重新获取商品列表
    } catch (error) {
      console.error("Delete category failed:", error); // 记录错误
      message.error("商品删除失败，请重试。"); // 提示删除失败
    }
  };

  // 定义表格列信息
  const columns = [
    {
      title: "ID", // 列标题
      dataIndex: "id", // 数据字段
      key: "id", // 唯一键
      sorter: (a, b) => a.id - b.id, // 添加排序函数
      defaultSortOrder: 'ascend', // 默认排序为升序
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
      render: (price) => `¥${price.toFixed(2)}`, // 格式化价格为人民币格式
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
          <Button type="primary" onClick={() => handlePublish(record.id)} className="publish-button"> {/* 发布按钮 */}
            发布
          </Button>
        </span>
      ),
    },
  ];

  // 处理表格变化（如排序）
  const handleTableChange = (pagination, filters, sorter) => {
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

  // 渲染组件
  return (
    <div className="product-list-container"> {/* 商品列表容器 */}
      <Breadcrumb className="breadcrumb"> {/* 面包屑导航 */}
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>还未发布</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="page-title">未发布商品列表</h1> {/* 页面标题 */}
      <Table
        columns={columns} // 表格列配置
        dataSource={products} // 表格数据源
        rowKey="id" // 每行的唯一键
        pagination={{
          showSizeChanger: true, // 显示页面大小改变器
          defaultPageSize: 5, // 默认每页显示5条
          pageSizeOptions: ["5", "10"], // 每页显示条数的选项
        }}
        onChange={handleTableChange} // 注册表格变化的处理函数
      />
    </div>
  );
};

export default ProductDrafts; // 导出ProductDrafts组件
