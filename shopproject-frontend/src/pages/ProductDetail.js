import React, { useEffect, useState } from 'react';
import { Descriptions, Button } from 'antd';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import openNotificationWithIcon from '../utils/notification';
import '../css/ProductDetail.css'; // 引入 CSS 文件

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/product/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }); // 注意这里没有前缀 /api
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
    <div className="product-detail-container">
      <h1 className="page-title">商品详情</h1>
      <Descriptions className="descriptions" title={product.name} bordered column={1}>
        <Descriptions.Item className="descriptions-item" label="ID">{product.id}</Descriptions.Item>
        <Descriptions.Item className="descriptions-item" label="名称">{product.name}</Descriptions.Item>
        <Descriptions.Item className="descriptions-item" label="价格">¥{product.price.toFixed(2)}</Descriptions.Item>
        <Descriptions.Item className="descriptions-item" label="库存">{product.stock}</Descriptions.Item>
        <Descriptions.Item className="descriptions-item" label="分类">{product.category.name}</Descriptions.Item>
        <Descriptions.Item className="descriptions-item" label="创建者">{product.CreatedBy.username}</Descriptions.Item>
        <Descriptions.Item className="descriptions-item" label="最后修改者">{product.ModifiedBy.username}</Descriptions.Item>
        <Descriptions.Item className="descriptions-item" label="描述">{product.description}</Descriptions.Item>
      </Descriptions>
      <div className="buttons-container">
        <Link to={`/product-form/edit/${product.id}`}>
          <Button type="primary">
            编辑商品
          </Button> 
        </Link>
        <Link to="/product-list">
          <Button>
            返回商品列表
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
