import type { DateClickArg } from '@fullcalendar/interaction';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useState } from 'react';

interface CalendarEvent {
  start: string;
  end: string;
  display: string;
  backgroundColor: string;
  borderColor: string;
}

type Props = {
  events: CalendarEvent[];
};

export const PublicCalendarEditer: React.FC<Props> = ({ events }) => {
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent>();

  const convertedEvents = events.map(({ start, end }) => ({
    start,
    end,
    backgroundColor: 'rgba(105, 132, 116, 0.7)',
    borderColor: '698474',
  }));

  const displayedEvents = [...convertedEvents].concat(selectedEvents || []);

  const isWithinEventRange = (clickedTime: Date): { isValid: boolean; event?: CalendarEvent } => {
    for (const event of events) {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);

      if (clickedTime >= eventStart && clickedTime <= eventEnd) {
        const hoursRemaining = (eventEnd.getTime() - clickedTime.getTime()) / (1000 * 60 * 60);
        //TODO: 걸리는 시간을 받아서 사용할 수 있도록 수정
        if (hoursRemaining >= 2) {
          return { isValid: true, event };
        } else {
          return { isValid: false, event };
        }
      }
    }
    return { isValid: false };
  };

  const handleTimeSelection = (clickedTime: Date) => {
    const { isValid, event } = isWithinEventRange(clickedTime);

    if (!event) {
      alert('선택할 수 있는 시간대가 아닙니다.');
      return;
    }

    if (!isValid) {
      alert('해당 시간대에는 2시간 이상의 여유 시간이 없습니다.');
      return;
    }

    const end = new Date(clickedTime.getTime() + 1000 * 60 * 60 * 2);
    const eventEnd = new Date(event.end);
    const finalEnd = end > eventEnd ? eventEnd : end;

    setSelectedEvents({
      start: clickedTime.toISOString(),
      end: finalEnd.toISOString(),
      display: 'background',
      backgroundColor: 'green',
      borderColor: '698474',
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
      dateClick={onDateClickHandler}
      eventClick={(info) => {
        if (info.event.start) {
          handleTimeSelection(info.event.start);
        }
      }}
    />
  );
};
