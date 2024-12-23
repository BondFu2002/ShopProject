import React from 'react';
import 'antd/dist/antd.css';
import AppRouter from './AppRouter';
import ErrorBoundary from './ErrorBoundary';

function App() {
    return (
        <ErrorBoundary>
            <AppRouter />
        </ErrorBoundary>
    );
}

export default App;