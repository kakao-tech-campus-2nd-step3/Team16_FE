import type { DateClickArg } from '@fullcalendar/interaction';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useState } from 'react';

import type { GroupEvent } from '@/types';
import { checkIsWithinEventRange, defaultEventToGroupEvent } from '@/utils/calendar';

interface CalendarEvent {
  start: string;
  end: string;
}

type Props = {
  events: CalendarEvent[];
  availableStart: string;
  availableEnd: string;
  duration: number;
  children?: (props: { selectedEvents?: GroupEvent }) => JSX.Element;
};

export const PublicCalendarEditer: React.FC<Props> = ({
  events,
  availableEnd,
  availableStart,
  duration,
  children,
}) => {
  const [selectedEvents, setSelectedEvents] = useState<GroupEvent>();
  const convertedEvents = defaultEventToGroupEvent(events);
  const displayedEvents = [...convertedEvents].concat(selectedEvents || []);

  const handleTimeSelection = (clickedTime: Date) => {
    const { isValid, event } = checkIsWithinEventRange({
      clickedTime,
      duration,
      events: convertedEvents,
    });

    if (!event) {
      alert('선택할 수 있는 시간대가 아닙니다.');
      return;
    }

    if (!isValid) {
      alert(`해당 시간대에는 ${duration}시간 이상의 여유 시간이 없습니다.`);
      return;
    }

    const end = new Date(clickedTime.getTime() + 1000 * 60 * 60 * duration);
    const eventEnd = new Date(event.end);
    const finalEnd = end > eventEnd ? eventEnd : end;

    setSelectedEvents({
      start: clickedTime.toISOString(),
      end: finalEnd.toISOString(),
      backgroundColor: 'green',
      borderColor: '698474',
      display: 'background',
    });
  };

  const onDateClickHandler = (info: DateClickArg) => {
    const clickedTime = new Date(info.dateStr);
    handleTimeSelection(clickedTime);
  };

  const validRange =
    events.length > 0
      ? {
          start: events[0].start,
          end: events[events.length - 1].end,
        }
      : undefined;

  return (
    <>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable={false}
        selectMirror={false}
        allDaySlot={false}
        dayMaxEvents={true}
        weekends={true}
        events={displayedEvents}
        headerToolbar={{
          right: 'prev,next today',
          center: 'title',
          left: 'timeGridWeek,timeGridDay',
        }}
        validRange={validRange}
        selectConstraint={{
          start: availableStart,
          end: availableEnd,
        }}
        dateClick={onDateClickHandler}
      />
      {children && children({ selectedEvents })}
    </>
  );
};
