import { useGetGroupCalendar } from '@/api/hooks/Calendar/useGetGroupCalendar';
import { useGetConfirmInfo } from '@/api/hooks/Meeting/useGetConfirmInfo';
import { useGetMeetingId } from '@/hooks/useGetMeetingId';
import {
  createEvent,
  PublicCalendarEditer,
} from '@/service/Calendar/components/PublicCalendarEditer/index';

import { GroupSelectedTime } from '../GroupSelectedTime';

export const GroupHostCalendar: React.FC = () => {
  const meetingId = useGetMeetingId();
  const { data: confirmedInfo, status: confirmStatus } = useGetConfirmInfo({ meetingId });
  const { data, status: calendarStatus } = useGetGroupCalendar(meetingId);

  if (confirmStatus === 'pending' || calendarStatus == 'pending') return <div>Loading...</div>;
  if (confirmStatus === 'error' || calendarStatus == 'error') return <div>Error</div>;

  const { startDate, endDate, availableTime, durationTime } = data;

  const isAlreadyConfirmed = !confirmedInfo;

  if (isAlreadyConfirmed) {
    return (
      <PublicCalendarEditer
        events={availableTime.map(({ startAt, endAt }) => ({ start: startAt, end: endAt }))}
        availableStart={startDate}
        availableEnd={endDate}
        duration={durationTime}
      >
        {(props) => <GroupSelectedTime {...props} />}
      </PublicCalendarEditer>
    );
  }

  const { confirmedDateTime } = confirmedInfo!;

  const events = availableTime.map(({ startAt, endAt }) => ({
    start: startAt,
    end: endAt,
  }));

  const initSelectedTime = createEvent(
    confirmedDateTime,
    new Date(new Date(confirmedDateTime).getTime() + durationTime * 60 * 60 * 1000).toISOString(),
  );

  return (
    <PublicCalendarEditer
      events={events}
      availableStart={startDate}
      availableEnd={endDate}
      duration={durationTime}
      editable={isAlreadyConfirmed}
      initSelectedTime={initSelectedTime}
    >
      {(props) => <GroupSelectedTime {...props} />}
    </PublicCalendarEditer>
  );
};
