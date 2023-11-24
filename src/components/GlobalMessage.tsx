import { message } from 'antd';

const GlobalMessage = () => {
  const [, contextHolder] = message.useMessage();

  return contextHolder
};

export default GlobalMessage;