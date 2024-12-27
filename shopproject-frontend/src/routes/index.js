import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import CategoryList from "../pages/Category/CategoryList";
import ProductList from "../pages/Product/ProductList";
import ProductDetail from "../pages/Product/ProductDetail";
import ProductForm from "../pages/Product/ProductForm";
import Layout from "../pages/Layout/Layout";
import Home from "../pages/Other/Home";
import UnpublishedProducts from "../pages/Product/ProductDrafts"
import UserList from "../pages/User/UserList"
import AuthRoute from "../components/AuthRoute";
import ChangeAdminPassword from "../pages/Other/ChangeAdminPassword"

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
    element:<AuthRoute> <Layout /></AuthRoute>,
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
        path: "/user-list",
        element: <UserList />,
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
      {
        path: "/admin-password-reset",
        element: <ChangeAdminPassword />,
      }
    ],
  },
]);

export default router;
