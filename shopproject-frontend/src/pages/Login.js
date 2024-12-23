import React from 'react';
import { Form, Input, Button } from 'antd';

const Login = () => {
    return (
        <Form>
            <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入你的用户名' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入你的密码' }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    登录
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;
