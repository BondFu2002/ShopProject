import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css"; // 引入 antd 的样式
import router from "./routes/index";
import ErrorBoundary from "./components/ErrorBoundary";
import { RouterProvider } from "react-router-dom";
import 'normalize.css'; 
import './global.css';
import "antd/dist/reset.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary>
    <RouterProvider router={router} />
  </ErrorBoundary>
);
