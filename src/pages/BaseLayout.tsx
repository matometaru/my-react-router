import { useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useMount, useUnmount } from 'react-use';
import { useLoadingStore } from '../stores/loading';

type Props = {
  children?: React.ReactNode;
};

const BaseLayout = (props: Props) => {
  const { showLoading, hideLoading } = useLoadingStore();

  useEffect(() => {
    showLoading('脳を起動中です...');
    setTimeout(() => {
      hideLoading();
    }, 2000);
  }, []);

  useMount(() => {
    console.log('BaseLayout: useMount');
  });

  useUnmount(() => {
    console.log('BaseLayout: useUnmount');
  });

  return (
    <div className="BaseLayout">
      <p>共通レイアウト</p>
      <ul>
        <li><NavLink to="/page-1">Page 1</NavLink></li>
        <li><NavLink to="/page-2">Page 2</NavLink></li>
        <li><NavLink to="/page-3">Page 3</NavLink></li>
      </ul>
      <Outlet />
    </div>
  );
}
export default BaseLayout;
