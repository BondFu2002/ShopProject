import React, { Component } from 'react'; // 导入React和Component类

// 创建一个错误边界组件
class ErrorBoundary extends Component {
    // 定义组件的状态
    state = {
        hasError: false, // 是否捕获到错误
        error: null, // 捕获的错误信息
        errorInfo: null, // 错误的附加信息
    };

    // 组件生命周期方法，捕获错误并更新状态
    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true, // 设置已捕获错误的状态为true
            error, // 保存错误信息
            errorInfo, // 保存错误的附加信息
        });
    }

    // 渲染方法
    render() {
        // 如果捕获到错误，显示错误提示
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>; // 可以修改为自定义的错误信息展示
        }
        // 否则正常渲染子组件
        return this.props.children; // 渲染子组件
    }
}

export default ErrorBoundary; // 导出错误边界组件
