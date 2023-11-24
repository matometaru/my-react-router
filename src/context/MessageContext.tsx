import { createContext, useContext, ReactNode } from 'react';
import { message } from 'antd';

type MessageDispatchContextType = {
  showInfo: (text: string) => void;
};
const MessageDispatchContext = createContext<MessageDispatchContextType>({
  showInfo: (text: string) => {},
});

type ContextProps = {
  children: ReactNode;
}
export const MessageProvider = ({ children }: ContextProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const showInfo = (text: string) => {
    messageApi.info(text);
  };

  return (
    <MessageDispatchContext.Provider value={{ showInfo }}>
      {contextHolder}
      {children}
    </MessageDispatchContext.Provider>
  );
};

export const useMessageDispatch = () => {
  return useContext(MessageDispatchContext);
};
