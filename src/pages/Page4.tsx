import { Suspense } from 'react';
import YesOrNo from "../components/YesOrNo";

const Page4 = () => {
  return (
    <>
      <h1>Yes or No?</h1>
      <Suspense fallback={<p>Loading 1...</p>}>
        <YesOrNo />
      </Suspense>
    </>
  );
}
export default Page4;
