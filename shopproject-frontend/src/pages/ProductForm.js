import React from 'react';
import { Form, Input, Button } from 'antd';

const ProductForm = () => {
    return (
        <Form>
            <Form.Item label="商品名称" name="name" rules={[{ required: true, message: '请输入商品名称' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="价格" name="price" rules={[{ required: true, message: '请输入价格' }]}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ProductForm;