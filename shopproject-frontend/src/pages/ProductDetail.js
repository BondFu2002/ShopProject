// src/pages/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { Descriptions, Button } from 'antd';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import openNotificationWithIcon from '../utils/notification';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/product/${id}`); // 注意这里没有前缀 /api
        setProduct(response.data);
      } catch (error) {
        console.error(error);
        openNotificationWithIcon('error', '获取商品详情失败', '请重试。');
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>商品详情</h1>
      <Descriptions title={product.name} bordered>
        <Descriptions.Item label="ID">{product.id}</Descriptions.Item>
        <Descriptions.Item label="名称">{product.name}</Descriptions.Item>
        <Descriptions.Item label="价格">{product.price}</Descriptions.Item>
        <Descriptions.Item label="库存">{product.stock}</Descriptions.Item>
        <Descriptions.Item label="分类">{product.category}</Descriptions.Item>
        <Descriptions.Item label="创建者">{product.CreatedBy}</Descriptions.Item>
        <Descriptions.Item label="最后修改者">{product.ModifiedBy}</Descriptions.Item>
        <Descriptions.Item label="描述">{product.description}</Descriptions.Item>
      </Descriptions>
      <Link to={`/product-form/edit/${product.id}`}>
        <Button type="primary" style={{ marginTop: 16 }}>
          编辑商品
        </Button>
      </Link>
      <Link to="/product-list">
        <Button style={{ marginTop: 16, marginLeft: 8 }}>
          返回列表
        </Button>
      </Link>
    </div>
  );
};

export default ProductDetail;