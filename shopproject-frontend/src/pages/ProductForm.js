import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Switch, InputNumber } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams(); // 获取URL中的id参数
  const navigate = useNavigate(); // 用于导航
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      const fetchProductData = async (productId) => {
        try {
          const response = await axios.get(`/product/${productId}`);
          form.setFieldsValue(response.data); // 设置表单的初始值
        } catch (error) {
          message.error("请求商品数据失败");
          console.error("Error:", error);
        }
      };
      fetchProductData(id);
    }
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      console.log("Submitting values:", values); // 打印请求体

      let response;
      if (isEdit) {
        // 更新商品
        response = await axios.patch(`/product/${id}`, values);
      } else {
        // 创建商品
        response = await axios.post(`/product`, values);
      }

      console.log("Response:", response); // 打印响应

      if (response.status === 200 || response.status === 201) {
        message.success("商品信息提交成功");
        navigate("/product-list"); // 提交成功后跳转到商品列表页面
      } else {
        throw new Error("提交商品信息失败");
      }
    } catch (error) {
      message.error("提交商品信息失败");
      console.error("Error:", error); // 打印错误信息以便调试
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="商品ID" name="id" required={false}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="商品名称"
        name="name"
        rules={[{ required: true, message: "请输入商品名称" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="价格"
        name="price"
        rules={[{ required: true, message: "请输入价格" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="库存"
        name="stock"
        rules={[{ required: true, message: "请输入库存" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="商品描述"
        name="description"
        rules={[{ required: true, message: "请输入商品描述" }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="是否发布"
        name="published"
        valuePropName="checked"
        initialValue={false}
        rules={[{ required: true, message: "请选择是否发布" }]}
      >
        <Switch />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isEdit ? "更新商品" : "创建商品"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
