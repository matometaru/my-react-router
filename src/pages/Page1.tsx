import { FC, useEffect } from 'react';
import { useLoadingDispatch } from '../context/LoadingContext';

const Page1: FC = () => {
  const { showLoading } = useLoadingDispatch();

  useEffect(() => {
    showLoading('脳を起動中です...');
  }, []);

  return (
    <>
      <h1>Page-1</h1>
      <p>おはよう。</p>
    </>
  );
}
export default Page1;
