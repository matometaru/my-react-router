import { useEffect } from 'react';
// import { useLoadingStore } from '../stores/loading';

const Page2 = () => {
  // const { showLoading, hideLoading } = useLoadingStore();

  // useEffect(() => {
  //   showLoading('脳を起動中です...');
  //   setTimeout(() => {
  //     hideLoading();
  //   }, 2000);
  // }, []);

  useEffect(() => {
    console.log('脳を起動中です...');
    setTimeout(() => {
      console.log('脳を起動中です...');
    }, 2000);
  }, []);

  useEffect(() => {
    console.log('Page2: mounted');
  });

  return (
    <>
      <h1>Page-2</h1>
      <p>こんにちは。</p>
    </>
  );
}
export default Page2;
