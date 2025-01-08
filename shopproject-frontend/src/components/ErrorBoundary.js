import React, { Component } from 'react'; // 导入React和Component类
import { message } from 'antd';

// 创建一个错误边界组件
class ErrorBoundary extends Component {
    state = { hasError: false };

    componentDidCatch(error, errorInfo) {
        this.setState({ hasError: true });
        message.error('Something went wrong. Please try again later.');
        console.error('Error:', error, 'Error Info:', errorInfo); // 记录错误信息
        
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}


export default ErrorBoundary; // 导出错误边界组件
