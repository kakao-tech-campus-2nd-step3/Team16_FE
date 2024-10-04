import { useQuery } from '@tanstack/react-query';

import { fetchWithToken } from '../instance';

export const getMyEventPath = () => 'calendar/events';

interface Time {
  time_id: number; // 시간 id
  start_at: string; // 시작 시간
  end_at: string; // 종료 시간
  time_zone: 'Asia/Seoul' | string; // 시간대
  all_day: boolean; // 종일 여부
}

interface Event {
  id: string; // 일정 id
  title: string; // 일정 제목
  type: string | null; // 일정 타입
  calendar_id: string | null; // 캘린더 id
  time: Time;
  is_host: boolean; // 일정 주최자 여부
  is_recur_event: boolean; // 반복 일정 여부
  rrule: string; // 일정 반복 주기
  dt_start: string; // 일정 시작일
  description: string; // 일정 설명
  location: null; // 일정 장소
  reminders: number[]; // 일정 알림
  color: string; // 일정 색상
  memo: string; // 일정 메모
}

export const getMyEvent = async () => {
  const response = await fetchWithToken<Event[]>(getMyEventPath());
  return response.data;
};

export const useGetMyEvent = () => {
  return useQuery({
    queryKey: [getMyEventPath()],
    queryFn: getMyEvent,
  });
};
