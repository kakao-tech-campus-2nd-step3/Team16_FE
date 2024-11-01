import { useParams } from 'react-router-dom';

import { useGetMeetingInfo } from '@/api/hooks/useGetMeetingInfo';
import { Container } from '@/components/common/layouts/Container';
import { JoinBtn } from '@/components/features/Join/JoinBtn';
import { JoinCalendar } from '@/components/features/Join/JoinCalendar';
import { JoinFood } from '@/components/features/Join/JoinFood';
import { JoinTitle } from '@/components/features/Join/JoinTitle';

export const JoinPage: React.FC = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const { data: meetingInfo, isLoading } = useGetMeetingInfo(meetingId || '');

  if (isLoading || !meetingInfo) {
    return <div>Loading...</div>;
  }

  const { title, startDate, endDate, startTime, endTime } = meetingInfo;

  return (
    <Container gap="40px">
      <JoinTitle title={title} />
      <JoinCalendar
        startDate={startDate}
        endDate={endDate}
        startTime={startTime}
        endTime={endTime}
      />
      <JoinFood />
      <JoinBtn />
    </Container>
  );
};
