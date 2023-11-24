import { createContext, useContext, ReactNode } from 'react';
import { message } from 'antd';

type MessageDispatchContextType = {
  showSuccess: (text: string) => void;
  showInfo: (text: string) => void;
  showError: (text: string, error?: Error) => void;
};
const MessageDispatchContext = createContext<MessageDispatchContextType>({
  showSuccess: (text: string) => {},
  showInfo: (text: string) => {},
  showError: (text: string, error?: Error) => {},
});

type ContextProps = {
  children: ReactNode;
}
export const MessageProvider = ({ children }: ContextProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const showSuccess = (text: string) => messageApi.success(text);
  const showInfo = (text: string) => messageApi.info(text);
  const showError = (text: string) => {
    messageApi.error(text);
  }

  return (
    <MessageDispatchContext.Provider value={{ showSuccess, showInfo, showError }}>
      {contextHolder}
      {children}
    </MessageDispatchContext.Provider>
  );
};

export const useMessageDispatch = () => {
  return useContext(MessageDispatchContext);
};
