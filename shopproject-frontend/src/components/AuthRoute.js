import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const isToken = localStorage.getItem("jwtToken");
  const role = localStorage.getItem("userRole");
  const location = useLocation(); // 获取当前路由路径

  // 定义 NORMAL 角色可以访问的路由列表
  const normalAllowedRoutes = [
    "/",
    "/product-list",
    "/category-list",
    "/user-list",
    "/product-drafts",
    /^\/product-detail\/\d+$/, // 使用正则表达式匹配 /product-detail/:id
    /^\/product-form\/edit\/\d+$/, // 使用正则表达式匹配 /product-form/edit/:id
    /^\/product-form\/create$/, // 使用字符串匹配 /product-form/create
  ];

  // 定义 USER 角色可以访问的路由列表
  const userAllowedRoutes = [
    "/",
    /^\/product-detail\/\d+$/, // 使用正则表达式匹配 /product-detail/:id
  ];

  // 检查当前路由是否在 NORMAL 角色允许的路由列表中
  const isNormalAllowedRoute = normalAllowedRoutes.some(route => {
    if (typeof route === "string") {
      return location.pathname === route;
    } else if (route instanceof RegExp) {
      return route.test(location.pathname);
    }
    return false;
  });

  // 检查当前路由是否在 USER 角色允许的路由列表中
  const isUserAllowedRoute = userAllowedRoutes.some(route => {
    if (typeof route === "string") {
      return location.pathname === route;
    } else if (route instanceof RegExp) {
      return route.test(location.pathname);
    }
    return false;
  });

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
