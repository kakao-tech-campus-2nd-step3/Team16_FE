import styled from '@emotion/styled';
import React from 'react';

import { useGetMyEvent } from '@/api/hooks/useGetMyEvents';
import { WeeklyCalendar } from '@/service/Calendar';
import type { Event } from '@/service/Calendar/types';
import { vars } from '@/styles';

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

  if (status === 'error') {
    return <div>Error</div>;
  }

  if (status === 'pending') {
    return <div>Loading...</div>;
  }

  const events: Event[] = data.map(({ id, title, color, time: { start_at, all_day, end_at } }) => ({
    id: id,
    title: title,
    date: start_at,
    allDay: all_day,
    start: start_at,
    end: end_at,
    backgroundColor: color,
    editable: true,
  }));

  return (
    <CalendarContainer>
      <WeeklyCalendar
        startDate={startDate}
        endDate={endDate}
        startTime={startTime}
        endTime={endTime}
        events={events}
      />
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  width: 100%;
  max-width: ${vars.breakpoints.lg};
`;
