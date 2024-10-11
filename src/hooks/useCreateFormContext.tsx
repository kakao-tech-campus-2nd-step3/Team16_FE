import { useForm, type UseFormReturn } from 'react-hook-form';

import type { CreateMeetingRequest } from '@/types';

export const useCreateFormContext = (): UseFormReturn<CreateMeetingRequest> => {
  return useForm<CreateMeetingRequest>({
    defaultValues: {
      title: '',
      startDate: undefined,
      endDate: undefined,
      durationTime: 1,
      startTime: '',
      endTime: '',
    },
  });
};
