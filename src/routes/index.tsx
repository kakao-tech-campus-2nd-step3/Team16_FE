import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { CreatePage } from '@/pages/Create';
import { GroupPage } from '@/pages/Group';
import { HomePage } from '@/pages/Home';
import { JoinPage } from '@/pages/Join';
import { LeaderPage } from '@/pages/Leader';
import { LoginPage } from '@/pages/Login';
import { MyPage } from '@/pages/MyPage';
import { OnboardingPage } from '@/pages/Onboarding';

import { RouterPath } from './path';

const router = createBrowserRouter([
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
  {
    path: RouterPath.onboarding,  
    element: <OnboardingPage />,  
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
