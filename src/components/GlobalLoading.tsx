import { Spin } from 'antd';
import { useLoadingStore } from '../stores/loading';

const GlobalLoading = () => {
  const { store } = useLoadingStore();

  // fullscreenの場合は下のコンテンツをクリックすることが可能
  // pointer-eventsを変更すればクリック不可にできる
  return (
    <Spin tip={store.text} spinning={store.loading} fullscreen />
  );
};

export default GlobalLoading;