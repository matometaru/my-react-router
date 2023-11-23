import { Suspense, useEffect } from 'react';
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import YesOrNo from "../components/YesOrNo";
import { message } from 'antd';

const ErrorMessage = ({ error }: FallbackProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  
  useEffect(() => {
    messageApi.error(error.message);
  }, [error, messageApi]);

  return (
    <>
      {contextHolder}
    </>
  );
};

const Page4 = () => {
  return (
    <>
      <h1>Yes or No?</h1>
      <ErrorBoundary FallbackComponent={ErrorMessage}>
        <Suspense fallback={<p>Loading 1...</p>}>
          <YesOrNo />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
export default Page4;
