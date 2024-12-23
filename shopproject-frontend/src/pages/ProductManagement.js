import React from 'react';
import { Table, Button } from 'antd';

const ProductManagement = () => {
    const columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
        },
        {
            title: '价格',
            dataIndex: 'price',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => (
                <span>
                    <Button type="link">详情</Button>
                    <Button type="link">编辑</Button>
                </span>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary" style={{ marginBottom: 16 }}>
                创建商品
            </Button>
            <Table columns={columns} dataSource={[]} />
        </div>
    );
};

export default ProductManagement;