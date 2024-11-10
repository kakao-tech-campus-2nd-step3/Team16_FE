import { useParams } from 'react-router-dom';

import { useGetMeetingInfo } from '@/api/hooks/useGetMeetingInfo';
import { useGetPersonalEvents } from '@/api/hooks/useGetPersonalEvents';
import { Container } from '@/components/common/layouts/Container';
import { EditBtn } from '@/components/features/Edit/EditBtn';
import { JoinCalendar } from '@/components/features/Join/JoinCalendar';
import { JoinFood } from '@/components/features/Join/JoinFood';
import { JoinTitle } from '@/components/features/Join/JoinTitle';
import { JoinFormProvider } from '@/hooks/useJoinFormContext';
import type { PersonalEvent, SelectedTime } from '@/types';

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

  const initialSelectedTimes: SelectedTime[] = personalEvents.flatMap((event: PersonalEvent) => {
    const startTime = new Date(event.start_at).getTime();
    const endTime = new Date(event.end_at).getTime();
    const timeSlots: SelectedTime[] = [];

    for (let time = startTime; time < endTime; time += 30 * 60 * 1000) {
      const slot = {
        startAt: new Date(time)
          .toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' })
          .replace(' ', 'T'),
        endAt: new Date(time + 30 * 60 * 1000)
          .toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' })
          .replace(' ', 'T'),
        timeZone: event.time_zone,
        allDay: event.all_day,
      };
      timeSlots.push(slot);
    }

    return timeSlots;
  });

  const { title, startDate, endDate, startTime, endTime } = meetingInfo;

  return (
    <JoinFormProvider
      initialData={{ times: initialSelectedTimes, preferences: [], nonPreferences: [] }}
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
