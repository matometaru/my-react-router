import { useEffect } from 'react';
import { useLoadingDispatch } from '../context/LoadingContext';

const Page1 = () => {
  const { showLoading, hideLoading } = useLoadingDispatch();

  useEffect(() => {
    showLoading('脳を起動中です...');
    setTimeout(() => {
      hideLoading();
    }, 2000);
  }, []);

  useEffect(() => {
    console.log('Page1: mounted');
  });

  return (
    <>
      <h1>Page-1</h1>
      <p>おはよう。</p>
    </>
  );
}
export default Page1;
