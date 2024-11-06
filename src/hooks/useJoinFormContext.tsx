import { useForm, type UseFormReturn } from 'react-hook-form';

import type { JoinMeetingRequest } from '@/types';

export const useJoinFormContext = (): UseFormReturn<JoinMeetingRequest> => {
  return useForm<JoinMeetingRequest>({
    defaultValues: {
      times: [],
      preferences: [],
      nonPreferences: [],
    },
  });
};
