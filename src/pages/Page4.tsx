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

const onError = (error: Error, info: { componentStack: string }) => {
  console.log('error.message', error.message)
  console.log('info.componentStack:', info.componentStack)
}

const Page4 = () => {
  return (
    <>
      <h1>Yes or No?</h1>
      <ErrorBoundary onError={onError} FallbackComponent={ErrorMessage}>
        <Suspense fallback={<p>Loading 1...</p>}>
          <YesOrNo />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
export default Page4;
