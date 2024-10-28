import { PublicCalendar } from '@/service/Calendar';

export const GroupCalendar: React.FC = () => {
  const events = [
    {
      start_at: '2022-10-28T03:00:00Z',
      end_at: '2022-10-29T06:00:00Z',
      time_zone: 'Asia/Seoul',
      all_day: false,
    },
    {
      start_at: '2022-10-28T03:00:00Z',
      end_at: '2022-10-29T06:00:00Z',
      time_zone: 'Asia/Seoul',
      all_day: false,
    },
    {
      start_at: '2022-10-28T03:00:00Z',
      end_at: '2022-10-29T06:00:00Z',
      time_zone: 'Asia/Seoul',
      all_day: false,
    },
    {
      start_at: '2022-10-28T03:00:00Z',
      end_at: '2022-10-29T06:00:00Z',
      time_zone: 'Asia/Seoul',
      all_day: false,
    },
  ];
  return <PublicCalendar event={events} />;
};
