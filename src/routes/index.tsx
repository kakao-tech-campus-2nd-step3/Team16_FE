import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { CreatePage } from '@/pages/Create';
import { GroupPage } from '@/pages/Group';
import { HomePage } from '@/pages/Home';
import { JoinPage } from '@/pages/Join';
import { LeaderPage } from '@/pages/Leader';
import { LoginPage } from '@/pages/Login';
import { MyPage } from '@/pages/MyPage';

import { RouterPath } from './path';

const router = createBrowserRouter([
  {
    path: RouterPath.root,
    element: <HomePage />,
  },
  {
      path: RouterPath.home,
      element: <HomePage />,
    },
    {
      path: RouterPath.create,
      element: <CreatePage />,
    },
    {
      path: RouterPath.group,
      element: <GroupPage />,
    },
    {
      path: RouterPath.join,
      element: <JoinPage />,
    },
    {
      path: RouterPath.leader,
      element: <LeaderPage />,
    },
    {
      path: RouterPath.login,
      element: <LoginPage />,
    },
    {
      path: RouterPath.mypage,
      element: <MyPage />,
    },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
