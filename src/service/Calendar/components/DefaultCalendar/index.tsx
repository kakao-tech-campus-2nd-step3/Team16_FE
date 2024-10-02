import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

import type { Event } from '@/service/Calendar/types';

type Props = {
  height?: number;
  evnets?: Event[];
};

export const DefaultCalendar: React.FC<Props> = ({ height, evnets }) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView="timeGridWeek"
      events={evnets}
      height={height}
      headerToolbar={{
        left: '',
        right: 'prev,title,next',
        center: 'dayGridMonth,timeGridWeek',
      }}
      views={{
        timeGridWeeks: {
          type: 'timeGrid',
          duration: { days: 4 },
        },
      }}
    />
  );
};
