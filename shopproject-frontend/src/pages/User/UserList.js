import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Breadcrumb,
  Select,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import apiClient from "../../components/apiClient";
import "../../css/User/UserList.css"; // 引入 CSS 文件

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();
  const [isAdmin, setIsAdmin] = useState(false);
  const { Option } = Select;

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await apiClient.get(
          `/users/${localStorage.getItem("userId")}`
        );
        const user = response.data;
        setIsAdmin(user.role === "ADMIN");
        if (user.role === "NORMAL") {
          setIsPasswordModalVisible(true);
        } else {
          fetchUsers();
        }
      } catch (error) {
        console.error("Verify user failed:", error);
        message.error("用户验证失败，请重试。");
      }
    };

    verifyUser();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get(`/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Fetch users failed:", error);
      message.error("获取用户列表失败，请重试。");
    }
  };

  const showEditModal = (record = null) => {
    setIsEditModalVisible(true);
    setIsEdit(!!record); // 如果有记录则是编辑
    setEditingUser(record);
    form.resetFields(); // 确保表单被重置以便输入新信息
    if (record) {
      form.setFieldsValue({
        username: record.username,
        email: record.email,
      });
    }
  };

  const handlePasswordSubmit = async () => {
    try {
      const values = await form.validateFields();
      const response = await apiClient.get(`/adminpassword/1`);
      const adminPassword = response.data.password;
      //console.log(adminPassword);
      if (values.password === adminPassword) {
        setIsPasswordModalVisible(false);
        fetchUsers();
      } else {
        message.error("密码错误，请重试。");
        //console.log(adminPassword);
      }
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  const handlePasswordCancel = () => {
    setIsPasswordModalVisible(false);
  };

  const handleEditOk = async () => {
    try {
      const values = await form.validateFields();

      if (isEdit) {
        await apiClient.patch(`/users/${editingUser.id}`, values);
        message.success("用户信息更新成功");
      } else {
        await apiClient.post(`/users`, values);
        message.success("用户创建成功");
      }

      setIsEditModalVisible(false);
      fetchUsers();
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    form.resetFields();
    setEditingUser(null); // 重置 editingUser 为 null
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/users/${id}`);
      message.success("用户删除成功");
      fetchUsers();
    } catch (error) {
      console.error("Delete user failed:", error);
      message.error("删除用户失败，请重试。");
    }
  };

  const columns = [
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "角色",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "修改时间",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "action",
      render: (text, record) => (
        <span>
          {isAdmin && (
            <>
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => showEditModal(record)}
                className="user-edit-button"
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
                  className="user-delete-button"
                >
                  删除
                </Button>
              </Popconfirm>
            </>
          )}
        </span>
      ),
    },
  ];

  return (
    <div className="user-list-container">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>用户管理</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="page-title">用户列表</h1>
      {isAdmin && (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showEditModal()} // 不传任何参数则表示创建用户
          className="create-button"
        >
          创建用户
        </Button>
      )}

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 5,
          pageSizeOptions: ["5", "10"],
        }}
      />
      <Modal
        title="请输入查看权限密码"
        open={isPasswordModalVisible}
        onOk={handlePasswordSubmit}
        onCancel={handlePasswordCancel}
        className="password-modal"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={isEdit ? "编辑用户" : "创建用户"}
        open={isEditModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        className="user-modal"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: "请输入邮箱" }]}
          >
            <Input />
          </Form.Item>

          {(editingUser && editingUser.role !== "ADMIN") || !isEdit ? (
            <Form.Item
              label="身份"
              name="role"
              rules={[{ required: true, message: "请选择身份" }]}
            >
              <Select>
                <Option value="USER">普通用户</Option>
                <Option value="NORMAL">普通管理员</Option>
              </Select>
            </Form.Item>
          ) : null}

          <Form.Item
            label="密码(不做更改请留空)"
            name="password"
            rules={[{ required: false, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserList;
