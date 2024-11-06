import styled from '@emotion/styled';
import React, { useState } from 'react';

import { useGetMyEvent } from '@/api/hooks/useGetMyEvents';
import { useJoinFormContext } from '@/hooks/useJoinFormContext';
import { WeeklyCalendar } from '@/service/Calendar';
import type { Event } from '@/service/Calendar/types';
import { vars } from '@/styles';
import { toggleSelectedEvent } from '@/utils/calendar/toggleSelectedEvent';

type JoinCalendarProps = {
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
  const { setValue } = useJoinFormContext();
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

  const isOverlappingWithDisplayed = (start: Date, end: Date) => {
    return displayedEvents.some((event) => {
      const displayedStart = new Date(event.start);
      const displayedEnd = new Date(event.end);

      return (
        (start > displayedStart && start < displayedEnd) ||
        (end > displayedStart && end < displayedEnd) ||
        (start <= displayedStart && end >= displayedEnd)
      );
    });
  };

  const handleSelectTime = (start: string, end: string) => {
    let selectedStart = new Date(start);
    let selectedEnd = new Date(end);

    if (selectedStart > selectedEnd) {
      [selectedStart, selectedEnd] = [selectedEnd, selectedStart];
    }

    if (isOverlappingWithDisplayed(selectedStart, selectedEnd)) {
      alert('선택할 수 없는 시간대입니다.');
      return;
    }

    const updatedEvents = toggleSelectedEvent(
      selectedStart.toISOString(),
      selectedEnd.toISOString(),
      selectedEvents,
    );
    setSelectedEvents(updatedEvents);

    setValue(
      'times',
      updatedEvents.map((event) => ({
        startAt: event.start,
        endAt: event.end,
        timeZone: 'Asia/Seoul',
        allDay: false,
      })),
    );
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
