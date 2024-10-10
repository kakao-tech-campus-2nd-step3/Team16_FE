import { useForm, type UseFormReturn } from 'react-hook-form';

import type { CreateMeetingRequest } from '@/types';

export const useCreateFormContext = (): UseFormReturn<CreateMeetingRequest> => {
  return useForm<CreateMeetingRequest>({
    defaultValues: {
      baseLocation: {
        location_id: 0,
        name: '',
        address: '',
        latitude: 0,
        longitude: 0,
      },
      title: '',
      startDate: undefined,
      endDate: undefined,
      durationTime: 1,
      startTime: '',
      endTime: '',
    },
  });
};
