import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router'

import { ConfigProvider } from 'antd';
import { LoadingProvider } from './context/LoadingContext';

function App() {
  return (
    <div className="App">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#10692A',
            colorLink: '#10692A',
          },
        }}
      >
        <LoadingProvider>
          <RouterProvider router={router} />
        </LoadingProvider>
      </ConfigProvider>
    </div>
  );
}

export default App;
