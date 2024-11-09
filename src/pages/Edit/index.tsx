import { useParams } from 'react-router-dom';

import { useGetMeetingInfo } from '@/api/hooks/useGetMeetingInfo';
import { useGetPersonalEvents } from '@/api/hooks/useGetPersonalEvents';
import { Container } from '@/components/common/layouts/Container';
import { EditBtn } from '@/components/features/Edit/EditBtn';
import { JoinCalendar } from '@/components/features/Join/JoinCalendar';
import { JoinFood } from '@/components/features/Join/JoinFood';
import { JoinTitle } from '@/components/features/Join/JoinTitle';
import { JoinFormProvider } from '@/hooks/useJoinFormContext';
import type { PersonalEvent } from '@/types';

export const EditPage: React.FC = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const { data: meetingInfo, isLoading: isMeetingInfoLoading } = useGetMeetingInfo(meetingId || '');
  const { data: personalEvents, isLoading: isPersonalEventsLoading } = useGetPersonalEvents(
    meetingId || '',
  );

  if (
    isMeetingInfoLoading ||
    isPersonalEventsLoading ||
    !meetingInfo ||
    !meetingId ||
    !personalEvents
  ) {
    return <div>Loading...</div>;
  }

  const initialSelectedTimes = personalEvents.map((event: PersonalEvent) => ({
    startAt: event.start_at,
    endAt: event.end_at,
    timeZone: event.time_zone,
    allDay: event.all_day,
  }));

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
          initialSelectedTimes={initialSelectedTimes}
        />
        <JoinFood />
        <EditBtn meetingId={meetingId} />
      </Container>
    </JoinFormProvider>
  );
};
