import { Navigate, useLocation } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const isToken = localStorage.getItem("jwtToken");
  const role = localStorage.getItem("userRole");
  const location = useLocation(); // 获取当前路由路径

  // 定义 NORMAL 角色可以访问的路由列表
  const normalAllowedRoutes = [
    "/product-list",
    "/category-list",
    "/user-list",
    "/product-detail/:id",
    "/product-form/edit/:id",
    "/product-form/create",
    "/product-drafts",
  ];
  // 定义 USER 角色可以访问的路由列表
  const userAllowedRoutes = ["/"];

  // 检查当前路由是否在 NORMAL 角色允许的路由列表中
  const isNormalAllowedRoute = normalAllowedRoutes.includes(location.pathname);

  // 检查当前路由是否在 USER 角色允许的路由列表中
  const isUserAllowedRoute = userAllowedRoutes.includes(location.pathname);

  if (isToken && role === "ADMIN") {
    return <>{children}</>;
  } else if (isToken && role === "USER" && isUserAllowedRoute) {
    return <>{children}</>;
  } else if (isToken && role === "NORMAL" && isNormalAllowedRoute) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default AuthRoute;
