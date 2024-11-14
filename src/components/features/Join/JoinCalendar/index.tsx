import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { useGetMyEvent } from '@/api/hooks/Calendar/useGetMyEvents';
import { useJoinFormContext } from '@/hooks/useJoinFormContext';
import { WeeklyCalendar } from '@/service/Calendar';
import type { Event } from '@/service/Calendar/types';
import { vars } from '@/styles';
import type { PersonalEvent } from '@/types';
import { getCurrentDateStrings } from '@/utils/calculator';
import {
  checkIsOverlapping,
  convertSelectedTimesToEvents,
  toggleSelectedEvent,
} from '@/utils/calendar';

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
  const duration = getCurrentDateStrings(new Date().toISOString());
  const { data, status } = useGetMyEvent(duration);
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

    if (checkIsOverlapping(selectedStart, selectedEnd, displayedEvents)) {
      alert('공통 일정은 선택할 수 없습니다.');
      return;
    }

    const localStartTime = `${selectedStart.getFullYear()}-${String(selectedStart.getMonth() + 1).padStart(2, '0')}-${String(selectedStart.getDate()).padStart(2, '0')}T${String(selectedStart.getHours()).padStart(2, '0')}:${String(selectedStart.getMinutes()).padStart(2, '0')}:00`;
    const localEndTime = `${selectedEnd.getFullYear()}-${String(selectedEnd.getMonth() + 1).padStart(2, '0')}-${String(selectedEnd.getDate()).padStart(2, '0')}T${String(selectedEnd.getHours()).padStart(2, '0')}:${String(selectedEnd.getMinutes()).padStart(2, '0')}:00`;

    const updatedEvents = toggleSelectedEvent(localStartTime, localEndTime, selectedEvents);

    setSelectedEvents(updatedEvents);

    const newTimes: PersonalEvent[] = updatedEvents.map((event) => ({
      start_at: event.start,
      end_at: event.end,
      time_zone: 'Asia/Seoul',
      all_day: false,
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
