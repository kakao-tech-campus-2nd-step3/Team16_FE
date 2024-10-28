import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

interface CalendarEvent {
  start: string;
  end: string;
  display: string;
  backgroundColor: string;
}

type Props = {
  events: CalendarEvent[];
};

export const PublicCalendar: React.FC<Props> = ({ events }) => {
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
      // events={displayedEvents}
      events={events}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek,timeGridDay',
      }}
      validRange={validRange}
      eventClassNames={(arg) => {
        return events.some((e) => e.start === arg.event.startStr) ? 'cursor-pointer' : '';
      }}
    />
  );
};
