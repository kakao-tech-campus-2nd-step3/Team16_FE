import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

interface CalendarEvent {
  start: string;
  end: string;
}

type Props = {
  events: CalendarEvent[];
  availableStart: string;
  availableEnd: string;
};

export const PublicCalendar: React.FC<Props> = ({ events, availableStart, availableEnd }) => {
  const convertedEvents = events.map(({ start, end }) => ({
    start,
    end,
    backgroundColor: 'rgba(105, 132, 116, 0.7)',
    borderColor: '698474',
  }));

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
