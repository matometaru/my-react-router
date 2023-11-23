import { Outlet, NavLink } from 'react-router-dom';
import { useMount, useUnmount } from 'react-use';
import * as Sentry from "@sentry/react";

type Props = {
  children?: React.ReactNode;
};

const BaseLayout = (props: Props) => {
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
      {/* <Sentry.ErrorBoundary fallback={<p>An error has occurred in BaseLayout</p>} showDialog> */}
        <Outlet />
      {/* </Sentry.ErrorBoundary> */}
    </div>
  );
}
export default BaseLayout;
