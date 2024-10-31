import { useGetGroupCalendar } from '@/api/hooks/useGetGroupCalendar';
import { useGetMeetingId } from '@/hooks/useGetMeetingId';
import { PublicCalendar } from '@/service/Calendar';

export const GroupCalendar: React.FC = () => {
  const meetingId = useGetMeetingId();
  const { data, status } = useGetGroupCalendar(meetingId);

  if (status === 'pending') return <div>Loading...</div>;
  if (status === 'error') return <div>Error</div>;

  const { startDate, endDate, availableTime } = data;

  const events = availableTime.map(({ startAt, endAt }) => ({
    start: startAt,
    end: endAt,
    backgroundColor: 'rgba(105, 132, 116, 0.7)',
    borderColor: '698474',
  }));

  return <PublicCalendar events={events} availableStart={startDate} availableEnd={endDate} />;
};
