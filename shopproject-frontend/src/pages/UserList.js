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
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import "../css/UserList.css"; // 引入 CSS 文件

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(
          `/users/${localStorage.getItem("userId")}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        );
        const user = response.data;
        setIsAdmin(user.role === "ADMIN");
        if (user.role === "USER") {
          setIsPasswordModalVisible(true);
        } else {
          fetchUsers();
        }
      } catch (error) {
        console.error("Verify user failed:", error);
        message.error("用户验证失败，请重试。");
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Fetch users failed:", error);
      message.error("获取用户列表失败，请重试。");
    }
  };

  

  const showEditModal = (record) => {
    setIsEditModalVisible(true);
    setIsEdit(true);
    setEditingUser(record);
    form.setFieldsValue({
      username: record.username,
      email: record.email,
    });
  };

  const handlePasswordSubmit = async () => {
    try {
      const values = await form.validateFields();
      const response = await axios.get(`/adminpassword/1`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      const adminPassword = response.data.password;
      console.log(adminPassword);
      if (values.password === adminPassword) {
        setIsPasswordModalVisible(false);
        fetchUsers();
      } else {
        message.error("密码错误，请重试。");
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
      await axios.patch(`/users/${editingUser.id}`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      message.success("用户信息更新成功");
      setIsEditModalVisible(false);
      fetchUsers();
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    form.resetFields();
  };

  const handleDelete = async (id) => {
    
      try {
        await axios.delete(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        });
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
            </>
          )}
        </span>
      ),
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
          onClick={showEditModal}
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
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserList;
