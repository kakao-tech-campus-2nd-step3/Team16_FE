import { Navigate, Outlet } from 'react-router-dom';

import { useGetPermission } from '@/api/hooks/Meeting/useGetPermission';
import { useGetMeetingId } from '@/hooks/useGetMeetingId';

import { RouterPath } from '../path';

export const HostRoute = () => {
  const meetingId = useGetMeetingId();
  const { data: userPermission } = useGetPermission(meetingId);

  if (!userPermission) return null;

  const { isHost } = userPermission;

  if (!isHost) return <Navigate to={RouterPath.home} replace />;

  return <Outlet />;
};
