import React from 'react';
import { Table, Button } from 'antd';

const CategoryManagement = () => {
    const columns = [
        {
            title: '分类名称',
            dataIndex: 'name',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => (
                <span>
                    <Button type="link">编辑</Button>
                </span>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary" style={{ marginBottom: 16 }}>
                创建分类
            </Button>
            <Table columns={columns} dataSource={[]} />
        </div>
    );
};

export default CategoryManagement;