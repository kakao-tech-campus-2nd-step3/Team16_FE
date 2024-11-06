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
  onSelectTime?: (start: string, end: string) => void;
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
    <div className="weekly">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
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
        events={[...displayedEvents, ...selectedEvents]}
        eventDisplay="background"
        allDaySlot={false}
        select={(info) => {
          const start = info.start.toISOString();
          const end = info.end.toISOString();
          if (onSelectTime) {
            onSelectTime(start, end);
          }
        }}
      />
    </div>
  );
};
