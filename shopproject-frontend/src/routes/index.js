import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CategoryManagement from "../pages/CategoryManagement";
import ProductManagement from "../pages/ProductManagement";
import ProductDetail from "../pages/ProductDetail";
import ProductForm from "../pages/ProductForm";

const router = [
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/category-management",
    Component: CategoryManagement,
  },
  {
    path: "/product-management",
    Component: ProductManagement,
  },
  {
    path: "/product-detail/:id",
    Component: ProductDetail,
  },
  {
    path: "/product-form",
    Component: ProductForm,
  },
];

export default createBrowserRouter(router);
