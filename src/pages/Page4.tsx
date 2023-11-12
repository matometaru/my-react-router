import { Suspense } from 'react';
import { ErrorBoundary } from "react-error-boundary";
import YesOrNo from "../components/YesOrNo";

const Page4 = () => {
  return (
    <>
      <h1>Yes or No?</h1>
      <ErrorBoundary fallback={<p>An error has occurred</p>}>
        <Suspense fallback={<p>Loading 1...</p>}>
          <YesOrNo />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
export default Page4;
