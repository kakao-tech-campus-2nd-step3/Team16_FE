import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Layout } from '@/components/features/Layout';
import { AuthProvider } from '@/hooks/useAuth';
import { CreatePage } from '@/pages/Create';
import { GroupPage } from '@/pages/Group';
import { HomePage } from '@/pages/Home';
import { JoinPage } from '@/pages/Join';
import { LeaderPage } from '@/pages/Leader';
import { LoginPage } from '@/pages/Login';
import { FailurePage } from '@/pages/Login/FailurePage';
import { SuccessPage } from '@/pages/Login/SuccessPage';
import { MyPage } from '@/pages/MyPage';

import { GuestRoute } from './components/GuestRoute';
import { HostRoute } from './components/HostRoute';
import { ProtectedRoute } from './components/ProtectedRoute';
import { RouterPath } from './path';

const router = createBrowserRouter([
  {
    path: RouterPath.home,
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    children: [
      {
        path: RouterPath.success,
        element: <SuccessPage />,
      },
      {
        path: RouterPath.failure,
        element: <FailurePage />,
      },
      {
        path: RouterPath.login,
        element: <LoginPage />,
      },
      {
        element: <ProtectedRoute />,
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
            element: <GuestRoute />,
            children: [
              {
                path: `${RouterPath.group}/:meetingId`,
                element: <GroupPage />,
              },
            ],
          },
          {
            path: `${RouterPath.join}/:meetingId`,
            element: <JoinPage />,
          },
          {
            path: `${RouterPath.leader}/:meetingId`,
            element: <HostRoute />,
            children: [
              {
                path: `${RouterPath.leader}/:meetingId`,
                element: <LeaderPage />,
              },
            ],
          },
          {
            path: RouterPath.mypage,
            element: <MyPage />,
          },
        ],
      },
    ],
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
