// import { useState } from 'react';

import { PublicCalendar } from '@/service/Calendar';
// import type { CalendarEvent } from '@/service/Calendar/components/PublicCalendar';

export const GroupCalendar: React.FC = () => {
  // const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([]);

  // console.log(selectedEvents);

  // const handleEventSelect = (newEvent: CalendarEvent) => {
  //   setSelectedEvents((prev) => [...prev, newEvent]);
  // };

  const events = [
    {
      start: '2024-10-28T10:00:00',
      end: '2024-10-28T12:00:00',
      display: 'background', // 배경 이벤트로 설정
      backgroundColor: 'rgba(59, 130, 246)', // 낮은 불투명도의 파란색
    },
    {
      start: '2024-10-28T13:00:00',
      end: '2024-10-28T18:00:00',
      display: 'background',
      backgroundColor: 'rgba(59, 130, 246)',
    },
  ];

  return (
    <PublicCalendar
      events={events}
      // availableStart="2024-10-28T00:00:00"
      // availableEnd="2024-11-03T23:59:59"
      // onEventSelect={handleEventSelect}
    />
  );
};
