import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import axios from "axios";
import openNotificationWithIcon from "../utils/notification";

const UnpublishedProducts = () => {
  const [unpublishedProducts, setUnpublishedProducts] = useState([]);

  // 将 fetchUnpublishedProducts 函数定义在 useEffect 外部
  const fetchUnpublishedProducts = async () => {
    try {
      const response = await axios.get("/product/drafts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      setUnpublishedProducts(response.data);
    } catch (error) {
      openNotificationWithIcon("error", "请求未发布的商品数据失败");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // 调用 fetchUnpublishedProducts 函数
    fetchUnpublishedProducts();
  }, []);

  const handlePublish = async (productId) => {
    try {
      const response = await axios.patch(`/product/${productId}`, {
        published: true,
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
    });
    
      if (response.status === 200) {
        openNotificationWithIcon("success", "商品发布成功");
        // 重新获取未发布的商品列表
        fetchUnpublishedProducts();
      } else {
        throw new Error("发布商品失败");
      }
    } catch (error) {
      openNotificationWithIcon("error", "商品发布失败");
      console.error("Error:", error);
    }
  };

  const columns = [
    {
      title: "商品ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "商品名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "库存",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "商品描述",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Button type="primary" onClick={() => handlePublish(record.id)}>
          发布
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>未发布的商品</h2>
      <Table dataSource={unpublishedProducts} columns={columns} rowKey="id" />
    </div>
  );
};

export default UnpublishedProducts;
