import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

import type { Event } from '@/service/Calendar/types';

type Props = {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  displayedEvents: Event[];
  selectedEvents: Event[];
  onSelectTime: (start: string, end: string) => void;
};

export const WeeklyCalendar: React.FC<Props> = ({
  startDate,
  endDate,
  startTime,
  endTime,
  displayedEvents,
  selectedEvents,
  onSelectTime,
}) => {
  return (
    <FullCalendar
      plugins={[timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      views={{
        timeGridWeek: {
          type: 'timeGridWeek',
          buttonText: '주간',
        },
      }}
      headerToolbar={{
        left: 'timeGridWeek',
        center: 'title',
        right: 'prev,next today',
      }}
      height="auto"
      selectable={true}
      selectMirror={true}
      validRange={{
        start: startDate,
        end: endDate,
      }}
      slotMinTime={startTime}
      slotMaxTime={endTime}
      events={[...displayedEvents, ...selectedEvents]}
      eventDisplay="background"
      eventOverlap={false}
      selectOverlap={(event) =>
        !displayedEvents.some(
          (e) => e.start === event.start?.toISOString() && e.end === event.end?.toISOString(),
        )
      }
      select={(info) => {
        const start = info.start.toISOString();
        const end = info.end.toISOString();
        onSelectTime(start, end);
      }}
      dateClick={(info) => {
        const start = info.date.toISOString();
        const end = new Date(info.date.getTime() + 30 * 60 * 1000).toISOString();
        onSelectTime(start, end);
      }}
    />
  );
};
