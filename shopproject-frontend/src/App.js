import React from "react";
import "antd/dist/reset.css"; // 引入 antd 的样式
import router from "./routes/index";
import ErrorBoundary from "./components/ErrorBoundary";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <div>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
