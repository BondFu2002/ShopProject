import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message, Popconfirm, Breadcrumb } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import "../../css/Category/CategoryList.css"; // 导入自定义的css样式文件
import apiClient from "../../components/apiClient";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get(`/category`);
      setCategories(response.data);
    } catch (error) {
      console.error("Fetch categories failed:", error);
      message.error("获取分类列表失败，请重试。");
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    setIsEdit(false);
    form.resetFields();
  };

  const showEditModal = (record) => {
    setIsModalVisible(true);
    setIsEdit(true);
    setEditingCategory(record);
    form.setFieldsValue({
      name: record.name,
      description: record.description, // 确保设置描述字段的值
    });
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (isEdit) {
        // 更新分类
        await apiClient.patch(`/category/${editingCategory.id}`, values);
        message.success("分类信息更新成功");
      } else {
        // 创建分类
        await apiClient.post(`/category`, values);
        message.success("分类信息提交成功");
      }
      setIsModalVisible(false);
      fetchCategories();
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/category/${id}`);
      message.success("分类删除成功");
      fetchCategories();
    } catch (error) {
      console.error("Delete category failed:", error);
      message.error("删除分类失败，请重试。");
    }
  };

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
            onClick={() => showEditModal(record)}
            className="edit-button"
          >
            编辑
          </Button>
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
        onClick={showModal}
        className="create-button"
      >
        创建分类
      </Button>
      <Table
        columns={columns}
        dataSource={categories}
        rowKey="id"
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 5,
          pageSizeOptions: ["5", "10"],
        }}
      />
      <Modal
        title={isEdit ? "编辑分类" : "创建分类"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="category-modal"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="分类名称"
            name="name"
            rules={[{ required: true, message: "请输入分类名称" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="描述"
            name="description"
            rules={[{ required: true, message: "请输入分类描述" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryList;
