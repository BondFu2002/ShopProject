import React from 'react';
import { Form, Input, Button, Checkbox, Space, Typography ,message} from 'antd'; // 导入 Ant Design 的组件
import { useFormik } from 'formik'; // 导入 Formik 钩子用于表单处理
import * as Yup from 'yup'; // 导入 Yup 用于表单验证规则
import axios from 'axios'; // 导入 axios 用于 HTTP 请求
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate 钩子用于路由导航
import '../../css/Login/Login.css'; // 引入自定义的登录页面样式

const { Title } = Typography; // 解构出 Typography 中的 Title 组件

// 定义登录表单的验证规则
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('无效的电子邮件格式').required('电子邮件是必填项'),
  password: Yup.string().required('密码是必填项'),
});

// 定义登录组件
const Login = () => {
  
  const navigate = useNavigate(); // 初始化 useNavigate 钩子，用于在提交表单后导航到注册页面或主页

  // 使用 Formik 来管理表单的状态和验证逻辑
  const formik = useFormik({
    initialValues: {
      email: '', // 初始化电子邮件字段为空字符串
      password: '', // 初始化密码字段为空字符串
    },
    validationSchema: LoginSchema, // 将自定义的验证规则应用到表单
    onSubmit: async (values) => { // 定义表单提交时的处理逻辑
      try {
        const response = await axios.post('/auth/login', values); // 发送 POST 请求到 /auth/login 接口，请求体包含表单数据

        // 存储 accessToken 到 localStorage
        localStorage.setItem('jwtToken', response.data.accessToken);
        localStorage.setItem('userName', response.data.userName);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('userRole', response.data.role);

        message.success('登录成功, 欢迎回来！'); // 调用自定义的通知函数，显示登录成功的通知

        // 导航到主页
        navigate('/');
      } catch (error) {
        console.error(error); // 打印错误信息到控制台
        message.error('登录失败，请检查输入的信息并重试。'); // 调用自定义的通知函数，显示登录失败的通知
      }
    },
  });

  // 渲染登录页面
  return (
    <div className="login-container"> 
      <Space direction="vertical" align="center" size="large" style={{ width: '100%' }}> 
        <Title level={3}>登录</Title>
        <Form
          name="login" // 表单的名称
          layout="vertical" // 表单的布局方式为垂直排列
          initialValues={formik.initialValues} // 表单的初始值，来自 Formik
          onFinish={formik.handleSubmit} // 表单提交时的处理函数，来自 Formik
          className="login-form" // 表单的自定义样式类名
        >
          <Form.Item // 定义电子邮件输入框的表单项
            label="电子邮件" // 表单项的标签
            name="email" // 表单项的名称，对应 Formik 中的字段名称
            help={formik.touched.email ? formik.errors.email : ''} // 显示电子邮件字段的错误提示，只有当字段被访问过时才显示
            validateStatus={formik.touched.email && formik.errors.email ? 'error' : ''} // 根据电子邮件字段的状态设置验证状态
          >
            <Input // 定义电子邮件输入框的组件
              name="email" // 输入框的名称，对应 Formik 中的字段名称
              value={formik.values.email} // 输入框的值，来自 Formik
              onChange={formik.handleChange} // 输入框值改变时触发的事件处理函数，来自 Formik
              onBlur={formik.handleBlur} // 输入框失去焦点时触发的事件处理函数，来自 Formik
            />
          </Form.Item>
          <Form.Item // 定义密码输入框的表单项
            label="密码" // 表单项的标签
            name="password" // 表单项的名称，对应 Formik 中的字段名称
            help={formik.touched.password ? formik.errors.password : ''} // 显示密码字段的错误提示，只有当字段被访问过时才显示
            validateStatus={formik.touched.password && formik.errors.password ? 'error' : ''} // 根据密码字段的状态设置验证状态
          >
            <Input.Password // 定义密码输入框的组件，使用 Input.Password 组件以隐藏输入内容
              name="password" // 输入框的名称，对应 Formik 中的字段名称
              value={formik.values.password} // 输入框的值，来自 Formik
              onChange={formik.handleChange} // 输入框值改变时触发的事件处理函数，来自 Formik
              onBlur={formik.handleBlur} // 输入框失去焦点时触发的事件处理函数，来自 Formik
            />
          </Form.Item>
          <Form.Item> 
            <Button type="primary" htmlType="submit" block> 
              登录
            </Button>
          </Form.Item>
          <Form.Item> 
            <Button type="link" onClick={() => navigate('/register')}>我要注册</Button> 
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};

export default Login; // 导出登录组件
