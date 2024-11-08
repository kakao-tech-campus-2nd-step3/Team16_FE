import { useParams } from 'react-router-dom';

import { useGetMeetingInfo } from '@/api/hooks/useGetMeetingInfo';
import { useGetPersonalEvents } from '@/api/hooks/useGetPersonalEvents';
import { Container } from '@/components/common/layouts/Container';
import { EditBtn } from '@/components/features/Edit/EditBtn';
import { JoinCalendar } from '@/components/features/Join/JoinCalendar';
import { JoinFood } from '@/components/features/Join/JoinFood';
import { JoinTitle } from '@/components/features/Join/JoinTitle';
import { JoinFormProvider } from '@/hooks/useJoinFormContext';
import type { SelectedTime } from '@/types';

export const EditPage: React.FC = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const { data: meetingInfo, isLoading: isMeetingInfoLoading } = useGetMeetingInfo(meetingId || '');
  const { data: personalEvents, isLoading: isPersonalEventsLoading } = useGetPersonalEvents(
    meetingId || '',
  );

  if (isMeetingInfoLoading || isPersonalEventsLoading || !meetingInfo || !meetingId) {
    return <div>Loading...</div>;
  }

  const { title, startDate, endDate, startTime, endTime } = meetingInfo;

  const initialTimes: SelectedTime[] =
    personalEvents?.map((event) => ({
      startAt: event.startAt,
      endAt: event.endAt,
      timeZone: event.timeZone,
      allDay: event.allDay,
    })) || [];

  return (
    <JoinFormProvider
      initialData={{ [meetingId]: { times: initialTimes, preferences: [], nonPreferences: [] } }}
    >
      <Container gap="40px">
        <JoinTitle title={title} />
        <JoinCalendar
          meetingId={meetingId}
          startDate={startDate}
          endDate={endDate}
          startTime={startTime}
          endTime={endTime}
        />
        <JoinFood />
        <EditBtn meetingId={meetingId} />
      </Container>
    </JoinFormProvider>
  );
};
