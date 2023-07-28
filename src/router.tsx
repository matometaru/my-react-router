import { createBrowserRouter } from 'react-router-dom';
import BaseLayout from './pages/BaseLayout';
// pages
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      { path: '/page-1', element: <Page1 /> },
      { path: '/page-2', element: <Page2 /> },
    ]
  },
  {
    path: '/page-3',
    element: <Page3 />
  },
]);

