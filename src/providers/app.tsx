import * as React from 'react';
import { ConfigProvider } from 'antd';
import { LoadingProvider } from '../context/LoadingContext';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#10692A',
          colorLink: '#10692A',
        },
      }}
    >
      <LoadingProvider>
        {children}
      </LoadingProvider>
    </ConfigProvider>
  );
};

export default AppProvider;
