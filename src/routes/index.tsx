import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { CreatePage } from '@/pages/Create';
import { GroupPage } from '@/pages/Group';
import { HomePage } from '@/pages/Home';
import { JoinPage } from '@/pages/Join';
import { LeaderPage } from '@/pages/Leader';
import { LoginPage } from '@/pages/Login';
import FailurePage from '@/pages/Login/FailurePage';
import SuccessPage from '@/pages/Login/SuccessPage';
import { MyPage } from '@/pages/MyPage';
import { OnboardingPage } from '@/pages/Onboarding';

import { RouterPath } from './path';

const RoutesComponent = () => {

  const router = createBrowserRouter([
    {
      path: RouterPath.home,
      element: <OnboardingPage handleKakaoLogin={() => { throw new Error('Function not implemented.'); }} />,
      children: [
        {
          path: '/',
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
          path: RouterPath.success,
          element: <SuccessPage />,
        },
        {
          path: RouterPath.failure,
          element: <FailurePage />,
        },
      ],
    },
    {
      path: RouterPath.onboarding,
      element: <OnboardingPage handleKakaoLogin={() => { throw new Error('Function not implemented.'); }} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export const Routes = RoutesComponent;
