import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

import type { CalendarEvent } from '@/types';
import { defaultEventToGroupEvent } from '@/utils/calendar/converter';

type Props = {
  events: CalendarEvent[];
  availableStart: string;
  availableEnd: string;
};

export const PublicCalendar: React.FC<Props> = ({ events, availableStart, availableEnd }) => {
  const convertedEvents = defaultEventToGroupEvent(events);

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
      events={convertedEvents}
      headerToolbar={{
        right: 'prev,next today',
        center: 'title',
        left: 'timeGridWeek,timeGridDay',
      }}
      selectConstraint={{
        start: availableStart,
        end: availableEnd,
      }}
      validRange={validRange}
    />
  );
};
