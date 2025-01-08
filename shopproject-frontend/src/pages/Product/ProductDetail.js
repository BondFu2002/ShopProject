import React, { useState, useEffect } from "react";
import { Descriptions, Button, message, Spin } from "antd";
import { useParams, Link } from "react-router-dom";
import apiClient from "../../components/apiClient";
import "../../css/Product/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(`/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
        message.error("获取商品详情失败，请重试。");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Spin size="large" />; // 显示加载指示器
  }

  if (!product) {
    return <div>商品未找到，可能是因为该商品不存在或网络错误。</div>; // 处理商品未找到的情况
  }

  return (
    <div className="product-detail-container">
      <h1 className="page-title">商品详情</h1>
      <Descriptions
        className="descriptions"
        title={product.name}
        bordered
        column={1}
      >
        <Descriptions.Item label="ID">{product.id}</Descriptions.Item>
        <Descriptions.Item label="名称">{product.name}</Descriptions.Item>
        <Descriptions.Item label="价格">
          ¥{product.price.toFixed(2)}
        </Descriptions.Item>
        <Descriptions.Item label="库存">{product.stock}</Descriptions.Item>
        <Descriptions.Item label="分类">
          {product.category.name}
        </Descriptions.Item>
        <Descriptions.Item label="创建者">
          {product.CreatedBy.username}
        </Descriptions.Item>
        <Descriptions.Item label="最后修改者">
          {product.ModifiedBy.username}
        </Descriptions.Item>
        <Descriptions.Item label="描述">
          {product.description}
        </Descriptions.Item>
      </Descriptions>
      <div className="buttons-container">
        {localStorage.getItem("userRole") !== "USER" && (
          <>
            <Link to={`/product-form/edit/${product.id}`}>
              <Button type="primary">编辑商品</Button>
            </Link>
            <Link to="/product-list">
              <Button>返回商品列表</Button>
            </Link>
          </>
        )}
        <Link to="/">
          <Button>返回首页</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
