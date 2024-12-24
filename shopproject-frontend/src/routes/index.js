import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CategoryList from "../pages/CategoryList";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";
import ProductForm from "../pages/ProductForm";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import UnpublishedProducts from "../pages/ProductDrafts"
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/product-list",
        element: <ProductList />,
      },
      {
        path: "/category-list",
        element: <CategoryList />,
      },

      {
        path: "/product-detail/:id",
        element: <ProductDetail />,
      },
      {
        path: "/product-form/edit/:id",
        element: <ProductForm />,
      },
      {
        path: "/product-form/create",
        element: <ProductForm />,
      },
      {
        path: "/product-drafts",
        element: <UnpublishedProducts />,
      },
    ],
  },
]);

export default router;
