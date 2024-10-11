import { useForm, type UseFormReturn } from 'react-hook-form';

export interface CreateFormInputs {
  meetingName: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  duration: number;
  startTime: string;
  endTime: string;
}

export const useCreateFormContext = (): UseFormReturn<CreateFormInputs> => {
  return useForm<CreateFormInputs>({
    defaultValues: {
      meetingName: '',
      startDate: undefined,
      endDate: undefined,
      duration: 1,
      startTime: '',
      endTime: '',
    },
  });
};
