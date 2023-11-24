import * as React from 'react';
import { ConfigProvider } from 'antd';

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
      {children}
    </ConfigProvider>
  );
};

export default AppProvider;
