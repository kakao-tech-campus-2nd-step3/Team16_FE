import styled from '@emotion/styled';
import { useState } from 'react';

import { useGetMyEvent } from '@/api/hooks/useGetMyEvents';
import { useJoinFormContext } from '@/hooks/useJoinFormContext';
import { WeeklyCalendar } from '@/service/Calendar';
import type { Event } from '@/service/Calendar/types';
import { vars } from '@/styles';
import type { SelectedTime } from '@/types';
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
  meetingId,
  startDate,
  endDate,
  startTime,
  endTime,
}) => {
  const { data, status } = useGetMyEvent();
  const { setTimes } = useJoinFormContext();
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);

  if (status === 'error') {
    return <div>Error</div>;
  }

  if (status === 'pending') {
    return <div>Loading...</div>;
  }

  const displayedEvents: Event[] = data.map(({ id, time: { start_at, end_at } }) => ({
    id: id,
    title: '',
    date: start_at,
    start: start_at,
    end: end_at,
    allDay: false,
    backgroundColor: 'lightgray',
  }));

  const handleSelectTime = (start: string, end: string) => {
    const [selectedStart, selectedEnd] = [new Date(start), new Date(end)].sort(
      (a, b) => a.getTime() - b.getTime(),
    );

    if (isOverlapping(selectedStart, selectedEnd, displayedEvents)) {
      alert('공통 일정은 선택할 수 없습니다.');
      return;
    }

    const updatedEvents = toggleSelectedEvent(
      selectedStart.toISOString(),
      selectedEnd.toISOString(),
      selectedEvents,
    );
    setSelectedEvents(updatedEvents);

    const newTimes: SelectedTime[] = updatedEvents.map((event) => ({
      startAt: event.start,
      endAt: event.end,
      timeZone: 'Asia/Seoul',
      allDay: false,
    }));
    if (meetingId) {
      setTimes(meetingId, newTimes);
    }
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
