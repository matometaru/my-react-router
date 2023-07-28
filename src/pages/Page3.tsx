import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useMount, useUnmount } from 'react-use';

const Page3: FC = () => {
  useMount(() => {
    console.log('Page3: useMount');
  });

  useUnmount(() => {
    console.log('Page3: useUnmount');
  });

  return (
    <>
      <ul>
        <li><NavLink to="/page-1">Page 1</NavLink></li>
        <li><NavLink to="/page-2">Page 2</NavLink></li>
        <li><NavLink to="/page-3?abc=123">Page 3 has query</NavLink></li>
      </ul>
      <h1>Page-3</h1>
      <p>おやすみ。</p>
    </>
  );
}
export default Page3;
