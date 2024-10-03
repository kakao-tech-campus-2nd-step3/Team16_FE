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
      initialView={'dayGridMonth'}
      views={{
        dayGridMonth: {
          type: 'dayGridMonth',
          buttonText: '월간',
        },
        timeGridWeek: {
          type: 'timeGridWeek',
          buttonText: '주간',
        },
      }}
      headerToolbar={{
        right: 'prev,next today',
        center: 'title',
        left: 'dayGridMonth,timeGridWeek',
      }}
      events={evnets}
      height={height}
    />
  );
};
