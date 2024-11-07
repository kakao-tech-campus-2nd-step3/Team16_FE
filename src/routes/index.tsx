import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Layout } from '@/components/features/Layout';
import { CreatePage } from '@/pages/Create';
import { GroupPage } from '@/pages/Group';
import { HomePage } from '@/pages/Home';
import { JoinPage } from '@/pages/Join';
import { LeaderPage } from '@/pages/Leader';
import { FailurePage } from '@/pages/Login/FailurePage';
import { SuccessPage } from '@/pages/Login/SuccessPage';
import { MyPage } from '@/pages/MyPage';
import { OnboardingPage } from '@/pages/Onboarding';

import { RouterPath } from './path';

const router = createBrowserRouter([
  {
    path: RouterPath.home,
    element: <Layout />,
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
        path: `${RouterPath.group}/:meetingId`,
        element: <GroupPage />,
      },
      {
        path: `${RouterPath.join}/:meetingId`,
        element: <JoinPage />,
      },
      {
        path: RouterPath.leader,
        element: <LeaderPage />,
      },
      {
        path: RouterPath.mypage,
        element: <MyPage />,
      },
    ],
  },
  {
    path: RouterPath.success,
    element: <SuccessPage />,
  },
  {
    path: RouterPath.failure,
    element: <FailurePage />,
  },
  {
    path: RouterPath.onboarding,
    element: <OnboardingPage />,
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
