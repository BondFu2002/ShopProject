import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message, Popconfirm, Breadcrumb } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../../css/Category/CategoryList.css"; // 导入自定义的CSS样式文件
import apiClient from "../../components/apiClient"; // 导入API客户端用于进行网络请求

const CategoryList = () => {
  // 声明状态变量
  const [categories, setCategories] = useState([]); // 存储分类列表
  const [isModalVisible, setIsModalVisible] = useState(false); // 控制模态框的显示与隐藏
  const [isEdit, setIsEdit] = useState(false); // 判断当前操作是编辑还是创建
  const [editingCategory, setEditingCategory] = useState(null); // 当前正在编辑的分类
  const [form] = Form.useForm(); // 使用Ant Design的Form表单实例

  // 组件挂载后获取分类列表
  useEffect(() => {
    fetchCategories();
  }, []);

  // 获取分类列表的函数
  const fetchCategories = async () => {
    try {
      const response = await apiClient.get(`/category`); // 发送GET请求获取分类数据
      setCategories(response.data); // 更新状态以存储分类数据
    } catch (error) {
      console.error("Fetch categories failed:", error);
      message.error("获取分类列表失败，请重试。"); // 显示错误消息
    }
  };

  // 显示创建分类模态框
  const showModal = () => {
    setIsModalVisible(true);
    setIsEdit(false);
    form.resetFields(); // 重置表单字段
  };

  // 显示编辑分类模态框，并填充表单数据
  const showEditModal = (record) => {
    setIsModalVisible(true);
    setIsEdit(true);
    setEditingCategory(record); // 设置正在编辑的分类
    form.setFieldsValue({
      name: record.name,
      description: record.description, // 设置描述字段的值
    });
  };

  // 模态框确认按钮的处理函数
  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // 验证表单数据
      if (isEdit) {
        // 更新分类
        await apiClient.patch(`/category/${editingCategory.id}`, values);
        message.success("分类信息更新成功");
      } else {
        // 创建新分类
        await apiClient.post(`/category`, values);
        message.success("分类信息提交成功");
      }
      setIsModalVisible(false); // 关闭模态框
      fetchCategories(); // 重新获取分类列表
    } catch (error) {
      console.error("Form validation failed:", error); // 处理验证失败的情况
    }
  };

  // 模态框取消按钮的处理函数
  const handleCancel = () => {
    setIsModalVisible(false); // 关闭模态框
    form.resetFields(); // 重置表单字段
  };

  // 删除分类的处理函数
  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/category/${id}`); // 发送DELETE请求删除分类
      message.success("分类删除成功");
      fetchCategories(); // 重新获取分类列表
    } catch (error) {
      console.error("Delete category failed:", error);
      message.error("删除分类失败，请重试。"); // 显示错误消息
    }
  };

  // 定义表格列的配置
  const columns = [
    {
      title: "分类名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "action",
      render: (text, record) => (
        <span>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)} // 点击编辑按钮显示编辑模态框
            className="edit-button"
          >
            编辑
          </Button>
          <Popconfirm
            title="是否确认删除？" // 确认删除的提示
            okText="删除"
            cancelText="取消"
            onConfirm={() => handleDelete(record.id)} // 确认删除时调用handleDelete
          >
            <Button
              type="link"
              icon={<DeleteOutlined />}
              className="delete-button"
            >
              删除
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className="category-list-container">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>分类管理</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="page-title">分类列表</h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal} // 点击按钮显示创建模态框
        className="create-button"
      >
        创建分类
      </Button>
      <Table
        columns={columns} // 表格列配置
        dataSource={categories} // 表格数据源
        rowKey="id" // 指定每行的唯一键
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 5, // 默认每页显示5条
          pageSizeOptions: ["5", "10"], // 每页显示条数的选项
        }}
      />
      <Modal
        title={isEdit ? "编辑分类" : "创建分类"} // 根据isEdit状态动态设置模态框标题
        open={isModalVisible} // 控制模态框的显示状态
        onOk={handleOk} // 确认按钮点击事件
        onCancel={handleCancel} // 取消按钮点击事件
        className="category-modal"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="分类名称"
            name="name"
            rules={[{ required: true, message: "请输入分类名称" }]} // 设置字段验证规则
          >
            <Input /> 
          </Form.Item>
          <Form.Item
            label="描述"
            name="description"
            rules={[{ required: true, message: "请输入分类描述" }]} // 设置字段验证规则
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryList; // 导出组件
