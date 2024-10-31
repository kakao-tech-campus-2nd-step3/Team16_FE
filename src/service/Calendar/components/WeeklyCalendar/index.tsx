import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

import type { Event } from '@/service/Calendar/types';

type Props = {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  events?: Event[];
};
export const WeeklyCalendar: React.FC<Props> = ({
  startDate,
  endDate,
  startTime,
  endTime,
  events = [],
}) => {
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
        height="auto"
        selectable={true}
        validRange={{
          start: startDate,
          end: endDate,
        }}
        slotMinTime={startTime}
        slotMaxTime={endTime}
        events={events}
        eventDisplay="background"
        eventOverlap={false}
        selectOverlap={false}
      />
    </div>
  );
};
