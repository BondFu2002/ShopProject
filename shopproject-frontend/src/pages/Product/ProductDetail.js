import React, { useEffect, useState } from "react"; // 导入React及其钩子
import { Descriptions, Button, message } from "antd"; // 导入Ant Design组件
import { useParams, Link } from "react-router-dom"; // 导入路由相关功能

import apiClient from "../../components/apiClient"; // 导入API客户端

import "../../css/Product/ProductDetail.css"; // 引入自定义CSS文件

const ProductDetail = () => {
  const { id } = useParams(); // 从路由中获取商品ID
  const [product, setProduct] = useState(null); // 状态变量，用于存储商品详情

  // 组件挂载时获取商品详情
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/product/${id}`); // 发送GET请求获取指定ID的商品详情
        setProduct(response.data); // 更新商品状态
      } catch (error) {
        console.error(error); // 记录错误
        message.error("获取商品详情失败, 请重试。"); // 提示用户错误信息
      }
    };

    fetchProduct(); // 调用获取商品详情的函数
  }, [id]); // 依赖于ID，即ID变化时重新获取商品详情

  return (
    <div className="product-detail-container"> 
      <h1 className="page-title">商品详情</h1> 
      <Descriptions
        className="descriptions" // 描述容器样式
        title={product.name} // 商品名称作为标题
        bordered // 设置边框
        column={1} // 设置描述列数为1
      >
        {/* 显示商品各种信息 */}
        <Descriptions.Item className="descriptions-item" label="ID">
          {product.id}
        </Descriptions.Item>
        <Descriptions.Item className="descriptions-item" label="名称">
          {product.name}
        </Descriptions.Item>
        <Descriptions.Item className="descriptions-item" label="价格">
          ¥{product.price.toFixed(2)}
        </Descriptions.Item>
        <Descriptions.Item className="descriptions-item" label="库存">
          {product.stock}
        </Descriptions.Item>
        <Descriptions.Item className="descriptions-item" label="分类">
          {product.category.name} 
        </Descriptions.Item>
        <Descriptions.Item className="descriptions-item" label="创建者">
          {product.CreatedBy.username} 
        </Descriptions.Item>
        <Descriptions.Item className="descriptions-item" label="最后修改者">
          {product.ModifiedBy.username} 
        </Descriptions.Item>
        <Descriptions.Item className="descriptions-item" label="描述">
          {product.description} 
        </Descriptions.Item>
      </Descriptions>
      <div className="buttons-container"> 
        <span>
          {localStorage.getItem("userRole") !== "USER" && ( // 如果用户角色不是普通用户，显示编辑和返回按钮
            <>
              <Link to={`/product-form/edit/${product.id}`}> 
                <Button type="primary">编辑商品</Button>
              </Link>
              <Link to="/product-list"> 
                <Button>返回商品列表</Button>
              </Link>
              <Link to="/product-drafts"> 
                <Button>返回未发布商品列表</Button>
              </Link>
            </>
          )}
        </span>
        <Link to="/"> 
          <Button>返回首页</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail; // 导出ProductDetail组件
