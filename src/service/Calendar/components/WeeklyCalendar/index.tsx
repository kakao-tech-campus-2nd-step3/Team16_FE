import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

import type { Event } from '@/service/Calendar/types';

type Props = {
  height?: number;
  events?: Event[];
};

export const WeeklyCalendar: React.FC<Props> = ({ height, events = [] }) => {
  return (
    <div className="weekly">
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
        height={height}
        selectable={true}
        selectAllow={({ start, end }) => {
          return !events.some(
            (event) =>
              (start >= new Date(event.start) && start < new Date(event.end)) ||
              (end > new Date(event.start) && end <= new Date(event.end)),
          );
        }}
        events={events}
        eventDisplay="background"
        eventOverlap={false}
        selectOverlap={false}
      />
    </div>
  );
};
