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

  if (!startDate || !endDate) {
    return {
      errorMessage: '시작일과 종료일을 입력해주세요.',
      isValid: false,
    };
  }

  if (startDate > endDate) {
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

  if (startTime >= endTime) {
    return {
      errorMessage: '종료 시간은 시작 시간보다 이후여야 합니다.',
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
