import dayjs from 'dayjs';

import type { CreateMeetingRequest } from '@/types';

export const validateCreateForm = (
  values: CreateMeetingRequest,
): { errorMessage?: string; isValid: boolean } => {
  const { baseLocation, durationTime, endDate, endTime, startDate, startTime, title } = values;

  if (!title || title.trim() === '') {
    return {
      errorMessage: '모임 이름을 입력해주세요.',
      isValid: false,
    };
  }

  if (title.length > 20) {
    return {
      errorMessage: '모임 이름은 20자 이내로 작성해주세요.',
      isValid: false,
    };
  }

  if (!startDate || !endDate) {
    return {
      errorMessage: '시작일과 종료일을 입력해주세요.',
      isValid: false,
    };
  }

  if (dayjs(startDate).isAfter(dayjs(endDate))) {
    return {
      errorMessage: '종료일은 시작일보다 이후여야 합니다.',
      isValid: false,
    };
  }

  if (!durationTime || durationTime < 1) {
    return {
      errorMessage: '모임 소요 시간을 1시간 이상으로 설정해주세요.',
      isValid: false,
    };
  }

  if (!startTime || !endTime) {
    return {
      errorMessage: '모임 시작 시간과 종료 시간을 입력해주세요.',
      isValid: false,
    };
  }

  if (dayjs(`1970-01-01T${startTime}`).isAfter(dayjs(`1970-01-01T${endTime}`))) {
    return {
      errorMessage: '종료 시간은 시작 시간보다 이후여야 합니다.',
      isValid: false,
    };
  }

  const timeDifferenceInHours = dayjs(`1970-01-01T${endTime}`).diff(
    dayjs(`1970-01-01T${startTime}`),
    'hour',
    true,
  );

  if (durationTime > timeDifferenceInHours) {
    return {
      errorMessage: '소요 시간은 시간 범위 내로 설정해주세요.',
      isValid: false,
    };
  }

  if (!baseLocation) {
    return {
      errorMessage: '위치 정보를 선택해주세요.',
      isValid: false,
    };
  }

  return {
    isValid: true,
  };
};
