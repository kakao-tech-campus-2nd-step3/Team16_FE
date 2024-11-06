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

  const displayedEvents: Event[] = data.map(
    ({ id, title, time: { start_at, all_day, end_at } }) => ({
      id: id,
      title: title,
      date: start_at,
      allDay: all_day,
      start: start_at,
      end: end_at,
      editable: false,
      backgroundColor: vars.colors.gray,
    }),
  );

  const handleSelectTime = (start: string, end: string) => {
    const updatedEvents = toggleSelectedEvent(start, end, selectedEvents);
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
