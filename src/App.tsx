import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router'
import { Spin } from 'antd';
import React from 'react';

function App() {
  const [loading, setLoading] = React.useState<boolean>(true);

  return (
    <div className="App">
      <Spin tip="Loading..." spinning={loading}>
        <RouterProvider router={router} />
      </Spin>
    </div>
  );
}

export default App;
