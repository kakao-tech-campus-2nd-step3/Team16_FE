import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { useGetMyEvent } from '@/api/hooks/useGetMyEvents';
import { useJoinFormContext } from '@/hooks/useJoinFormContext';
import { WeeklyCalendar } from '@/service/Calendar';
import type { Event } from '@/service/Calendar/types';
import { vars } from '@/styles';
import type { SelectedTime } from '@/types';
import { convertSelectedTimesToEvents } from '@/utils/calendar/convertSelectedTimesToEvents';
import { isOverlapping } from '@/utils/calendar/isOverlapping';
import { toggleSelectedEvent } from '@/utils/calendar/toggleSelectedEvent';

type JoinCalendarProps = {
  meetingId: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
};

export const JoinCalendar: React.FC<JoinCalendarProps> = ({
  startDate,
  endDate,
  startTime,
  endTime,
}) => {
  const { data, status } = useGetMyEvent();
  const { setTimes, meetingData } = useJoinFormContext();

  const [selectedEvents, setSelectedEvents] = useState<Event[]>(
    convertSelectedTimesToEvents(meetingData.times),
  );

  useEffect(() => {
    setSelectedEvents(convertSelectedTimesToEvents(meetingData.times));
  }, [meetingData.times]);

  if (status === 'error') {
    return <div>Error</div>;
  }

  if (status === 'pending') {
    return <div>Loading...</div>;
  }

  const displayedEvents: Event[] = data.map(({ id, time: { start_at, end_at } }) => ({
    id,
    title: '',
    date: start_at,
    start: start_at,
    end: end_at,
    allDay: false,
    backgroundColor: 'lightgray',
  }));

  const handleSelectTime = (start: string, end: string) => {
    const selectedStart = new Date(start);
    const selectedEnd = new Date(end);

    if (isOverlapping(selectedStart, selectedEnd, displayedEvents)) {
      alert('공통 일정은 선택할 수 없습니다.');
      return;
    }

    const localStartTime = `${selectedStart.getFullYear()}-${String(selectedStart.getMonth() + 1).padStart(2, '0')}-${String(selectedStart.getDate()).padStart(2, '0')}T${String(selectedStart.getHours()).padStart(2, '0')}:${String(selectedStart.getMinutes()).padStart(2, '0')}:00`;
    const localEndTime = `${selectedEnd.getFullYear()}-${String(selectedEnd.getMonth() + 1).padStart(2, '0')}-${String(selectedEnd.getDate()).padStart(2, '0')}T${String(selectedEnd.getHours()).padStart(2, '0')}:${String(selectedEnd.getMinutes()).padStart(2, '0')}:00`;

    const updatedEvents = toggleSelectedEvent(localStartTime, localEndTime, selectedEvents);
    setSelectedEvents(updatedEvents);

    const newTimes: SelectedTime[] = updatedEvents.map((event) => ({
      startAt: event.start,
      endAt: event.end,
      timeZone: 'Asia/Seoul',
      allDay: false,
    }));

    setTimes(newTimes);
  };

  return (
    <CalendarContainer>
      <WeeklyCalendar
        startDate={startDate}
        endDate={endDate}
        startTime={startTime}
        endTime={endTime}
        displayedEvents={displayedEvents}
        selectedEvents={selectedEvents}
        onSelectTime={handleSelectTime}
      />
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  width: 100%;
  max-width: ${vars.breakpoints.lg};
`;
