import { useGetGroupCalendar } from '@/api/hooks/Calendar/useGetGroupCalendar';
import { useGetMeetingId } from '@/hooks/useGetMeetingId';
import { PublicCalendarEditer } from '@/service/Calendar/components/PublicCalendarEditer/index';

import { GroupSelectedTime } from '../GroupSelectedTime';

export const GroupHostCalendar: React.FC = () => {
  const meetingId = useGetMeetingId();
  const { data, status } = useGetGroupCalendar(meetingId);

  if (status === 'pending') return <div>Loading...</div>;
  if (status === 'error') return <div>Error</div>;

  const { startDate, endDate, availableTime, durationTime } = data;

  const events = availableTime.map(({ startAt, endAt }) => ({
    start: startAt,
    end: endAt,
  }));

  return (
    <PublicCalendarEditer
      events={events}
      availableStart={startDate}
      availableEnd={endDate}
      duration={durationTime}
    >
      {(props) => <GroupSelectedTime {...props} />}
    </PublicCalendarEditer>
  );
};
