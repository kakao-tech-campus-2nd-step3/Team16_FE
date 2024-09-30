import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

import type { Event } from '@/service/Calendar/types';

type Props = {
  height?: number;
  evnets?: Event[];
  //TODO: 캘린더 수정 부분 추가시 사용
  // onChange?: () => void;
};

export const DefaultCalendar: React.FC<Props> = ({ height, evnets }) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
      initialView="timeGridWeek"
      events={evnets}
      height={height}
      // TODO: 캘린더 수정 추가시 사용
      // eventDrop={(info) => {
      //   alert(info.event.title + ' was dropped on ' + info.event.start);
      // }}
      // eventResizableFromStart
      // eventDragStart={(info) => {
      //   alert('Event ' + info.event.title + ' is being dragged');
      // }}
      // dragScroll
      // droppable
      // expandRows

      // TODO: 일정 추가 혹은 일정 표시시 사용
      // select={(info) => {
      //   const input = prompt('Enter new title:', info.startStr);
      //   if (input) {
      //     console.log(info);
      //     info.view.calendar.addEvent({
      //       title: input,
      //       start: info.startStr,
      //       end: info.endStr,
      //       allDay: info.allDay,
      //     });
      //   }
      // }}
      // selectable={true}
      // selectMirror={true}
      // editable={true}

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
