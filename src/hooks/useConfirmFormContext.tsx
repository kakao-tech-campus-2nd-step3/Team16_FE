import type { UseFormReturn } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { ConfirmMeetingRequest } from '@/api/hooks/Meeting/useConfirm';

export const useConfirmFormContext = (): UseFormReturn<ConfirmMeetingRequest> => {
  return useForm<ConfirmMeetingRequest>({
    defaultValues: {
      confirmDateTime: '',
      confirmFoodId: 0,
    },
  });
};
