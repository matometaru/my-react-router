import * as React from 'react';
import { ConfigProvider } from 'antd';
import { MessageProvider } from '../context/MessageContext';

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
      <MessageProvider>
        {children}
      </MessageProvider>
    </ConfigProvider>
  );
};

export default AppProvider;
