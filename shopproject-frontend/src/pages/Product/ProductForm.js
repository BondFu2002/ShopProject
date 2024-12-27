import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Switch,
  InputNumber,
  Select,
} from "antd";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../../css/Product/ProductForm.css";

import apiClient from "../../components/apiClient";

const { Option } = Select;

const ProductForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams(); // 获取URL中的id参数
  const navigate = useNavigate(); // 用于导航
  const [isEdit, setIsEdit] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // 获取分类数据
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get(`/category`);
        setCategories(response.data);
      } catch (error) {
        message.error("请求分类数据失败");
        console.error("Error:", error);
      }
    };

    fetchCategories();

    // 如果是编辑模式，获取商品数据
    if (id) {
      setIsEdit(true);
      const fetchProductData = async (productId) => {
        try {
          const response = await apiClient.get(`/product/${productId}`);
          form.setFieldsValue({
            ...response.data,
            categoryId: response.data.categoryId, // 确保分类ID正确设置
          });
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
        const updatedValues = {
          ...values,
          MId: parseInt(localStorage.getItem("userId"), 10),
        };
        response = await apiClient.patch(`/product/${id}`, updatedValues);
      } else {
        // 创建商品
        const newValues = {
          ...values,
          MId: parseInt(localStorage.getItem("userId"), 10),
          CId: parseInt(localStorage.getItem("userId"), 10),
        };
        console.log(localStorage.getItem("userId"));
        console.log(newValues);
        response = await apiClient.post(`/product`, newValues);
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
    <div className="user-product-form-container">
        <h1 className="page-title">{isEdit ? "编辑商品" : "创建商品"}</h1>
        <Form form={form} onFinish={onFinish} layout="vertical">
            {isEdit && (
                <Form.Item label="商品ID" name="id" required={false}>
                    <InputNumber style={{ width: "100%" }} disabled />
                </Form.Item>
            )}
            <Form.Item
                label={<span className="form-item-label">商品名称</span>}
                name="name"
                rules={[{ required: true, message: "请输入商品名称" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={<span className="form-item-label">价格</span>}
                name="price"
                rules={[{ required: true, message: "请输入价格" }]}
            >
                <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
                label={<span className="form-item-label">库存</span>}
                name="stock"
                rules={[{ required: true, message: "请输入库存" }]}
            >
                <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
                label={<span className="form-item-label">商品描述</span>}
                name="description"
                rules={[{ required: true, message: "请输入商品描述" }]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label={<span className="form-item-label">分类</span>}
                name="categoryId"
                rules={[{ required: true, message: "请选择分类" }]}
            >
                <Select style={{ width: "100%" }}>
                    {categories.map((category) => (
                        <Option key={category.id} value={category.id}>
                            {category.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label={<span className="form-item-label">是否发布</span>}
                name="published"
                valuePropName="checked"
                initialValue={false}
                rules={[{ required: true, message: "请选择是否发布" }]}
            >
                <Switch />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="submit-button">
                    {isEdit ? "更新商品" : "创建商品"}
                </Button>
            </Form.Item>

            <Form.Item>
                <Link to="/product-list">
                    <Button className="link-button">返回商品列表</Button>
                </Link>
            </Form.Item>
        </Form>
    </div>
);

};

export default ProductForm;
