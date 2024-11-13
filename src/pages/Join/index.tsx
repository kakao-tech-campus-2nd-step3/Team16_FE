import { useParams } from 'react-router-dom';

import { useGetMeetingInfo } from '@/api/hooks/useGetMeetingInfo';
import { Container } from '@/components/common/layouts/Container';
import { JoinBtn } from '@/components/features/Join/JoinBtn';
import { JoinCalendar } from '@/components/features/Join/JoinCalendar';
import { JoinNonPreferences } from '@/components/features/Join/JoinNonPreferences';
import { JoinPreferences } from '@/components/features/Join/JoinPreferences';
import { JoinTitle } from '@/components/features/Join/JoinTitle';
import { JoinFormProvider } from '@/hooks/useJoinFormContext';

export const JoinPage: React.FC = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const { data: meetingInfo, isLoading } = useGetMeetingInfo(meetingId || '');

  if (isLoading || !meetingInfo || !meetingId) {
    return <div>Loading...</div>;
  }

  const { title, startDate, endDate, startTime, endTime } = meetingInfo;

  return (
    <JoinFormProvider>
      <Container gap="40px">
        <JoinTitle title={title} />
        <JoinCalendar
          meetingId={meetingId}
          startDate={startDate}
          endDate={endDate}
          startTime={startTime}
          endTime={endTime}
        />
        <JoinPreferences />
        <JoinNonPreferences />
        <JoinBtn meetingId={meetingId} />
      </Container>
    </JoinFormProvider>
  );
};
