import React from "react";
import { Form, Input, Button, message } from "antd"; // 导入 Ant Design 的组件
import { useFormik } from "formik"; // 导入 Formik 钩子用于表单处理
import * as Yup from "yup"; // 导入 Yup 用于表单验证规则
import apiClient from "../../components/apiClient";
import { useNavigate } from "react-router-dom"; // 导入 useNavigate 钩子用于路由导航
import "../../css/Other/ChangeAdminPassword.css"; // 引入自定义的修改密码页面样式

// 定义修改密码表单的验证规则
const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("原密码是必填项"),
  newPassword: Yup.string().required("新密码是必填项").min(6, "新密码至少6个字符"),
  confirmPassword: Yup.string()
    .required("确认密码是必填项")
    .oneOf([Yup.ref("newPassword"), null], "新密码和确认密码必须匹配"),
});

// 定义修改密码组件
const ChangeAdminPassword = () => {
  const navigate = useNavigate(); // 初始化 useNavigate 钩子，用于在提交表单后导航到其他页面

  // 使用 Formik 来管理表单的状态和验证逻辑
  const formik = useFormik({
    initialValues: {
      oldPassword: "", // 初始化原密码字段为空字符串
      newPassword: "", // 初始化新密码字段为空字符串
      confirmPassword: "", // 初始化确认密码字段为空字符串
    },
    validationSchema: ChangePasswordSchema, // 将自定义的验证规则应用到表单
    onSubmit: async (values) => {
      try {
        // 验证原密码
        const response = await apiClient.get(`/adminpassword/1`);

        const adminPassword = response.data.password;

        if (values.oldPassword !== adminPassword) {
          message.error("原密码不正确，请重试。");
          return;
        }

        // 更新数据库密码
        await apiClient.patch(`/adminpassword/1`, { password: values.newPassword });

        message.success("密码修改成功！");
        formik.resetForm(); // 重置表单
        navigate("/"); 
      } catch (error) {
        console.error("Change password failed:", error);
        message.error("密码修改失败，请重试。");
      }
    },
  });

  // 渲染修改密码页面
  return (
    <div className="change-password-container">
      <Form
        name="change-password"
        layout="vertical"
        initialValues={formik.initialValues}
        onFinish={formik.handleSubmit}
        className="change-password-form"
      >
        <Form.Item
          label="原密码"
          name="oldPassword"
          help={formik.touched.oldPassword ? formik.errors.oldPassword : ""}
          validateStatus={formik.touched.oldPassword && formik.errors.oldPassword ? "error" : ""}
        >
          <Input.Password
            name="oldPassword"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="newPassword"
          help={formik.touched.newPassword ? formik.errors.newPassword : ""}
          validateStatus={formik.touched.newPassword && formik.errors.newPassword ? "error" : ""}
        >
          <Input.Password
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item
          label="确认新密码"
          name="confirmPassword"
          help={formik.touched.confirmPassword ? formik.errors.confirmPassword : ""}
          validateStatus={formik.touched.confirmPassword && formik.errors.confirmPassword ? "error" : ""}
        >
          <Input.Password
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            修改密码
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangeAdminPassword;
