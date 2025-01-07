import React from 'react';
import { Form, Input, Button, Checkbox, Space, Typography ,message} from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { useNavigate } from 'react-router-dom'; // 导入 useNavigate 钩子，用于页面导航
import '../../css/Login/Register.css'; // 引入自定义样式文件


const { Title } = Typography;

// 定义注册表单的验证规则
const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('用户名是必填项'), // 用户名必须填写
  email: Yup.string().email('无效的电子邮件格式').required('电子邮件是必填项'), // 电子邮件必须填写且格式正确
  password: Yup.string().min(6, '密码至少6个字符').required('密码是必填项'), // 密码必须填写且至少6个字符
});

const Register = () => {
  const navigate = useNavigate(); // 初始化 navigate 钩子，用于在组件中进行页面跳转

  // 使用 formik 初始化表单状态和处理表单提交
  const formik = useFormik({
    initialValues: { // 设置表单初始值
      username: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema, // 设置表单验证规则
    onSubmit: async (values) => { // 定义表单提交时的处理逻辑
      try {
        const newValues = {
          ...values,
          role: 'USER', // 设置默认角色为普通用户
         }
        const response = await axios.post('/users', newValues); // 发送 POST 请求到 /users 接口进行注册
        console.log(response.data); // 打印后端返回的数据
        message.success('注册成功, 欢迎加入我们的平台！'); // 显示注册成功的通知
        navigate('/login'); // 注册成功后跳转到登录页面
      } catch (error) {
        console.error(error); // 打印错误信息
        message.error('注册失败, 请检查输入的信息并重试。'); // 显示注册失败的通知
      }
    },
  });

  return (
    <div className="register-container">
      <Space direction="vertical" align="center" size="large" style={{ width: '100%' }}>
        <Title level={3}>注册</Title> 
        <Form
          name="register"
          layout="vertical"
          initialValues={formik.initialValues} // 设置表单初始值
          onFinish={formik.handleSubmit} // 设置表单提交时的处理逻辑
          className="register-form"
        >
          <Form.Item
            label="用户名"
            name="username"
            help={formik.touched.username ? formik.errors.username : ''} // 显示用户名验证错误信息
            validateStatus={formik.touched.username && formik.errors.username ? 'error' : ''} // 设置用户名验证状态
          >
            <Input
              name="username"
              value={formik.values.username} // 绑定用户名输入值到表单状态
              onChange={formik.handleChange} // 绑定用户名输入值变化的处理函数
              onBlur={formik.handleBlur} // 绑定用户名输入框失去焦点的处理函数
            />
          </Form.Item>
          <Form.Item
            label="电子邮件"
            name="email"
            help={formik.touched.email ? formik.errors.email : ''} // 显示电子邮件验证错误信息
            validateStatus={formik.touched.email && formik.errors.email ? 'error' : ''} // 设置电子邮件验证状态
          >
            <Input
              name="email"
              value={formik.values.email} // 绑定电子邮件输入值到表单状态
              onChange={formik.handleChange} // 绑定电子邮件输入值变化的处理函数
              onBlur={formik.handleBlur} // 绑定电子邮件输入框失去焦点的处理函数
            />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            help={formik.touched.password ? formik.errors.password : ''} // 显示密码验证错误信息
            validateStatus={formik.touched.password && formik.errors.password ? 'error' : ''} // 设置密码验证状态
          >
            <Input.Password
              name="password"
              value={formik.values.password} // 绑定密码输入值到表单状态
              onChange={formik.handleChange} // 绑定密码输入值变化的处理函数
              onBlur={formik.handleBlur} // 绑定密码输入框失去焦点的处理函数
            />
          </Form.Item>
          <Form.Item>
            <Checkbox>记住我</Checkbox> 
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              注册
            </Button> 
          </Form.Item>
          <Form.Item>
            <Button type="link" onClick={() => navigate('/login')}>已有账户？前往登录</Button>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};

export default Register;
