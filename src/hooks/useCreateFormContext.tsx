import { useForm } from 'react-hook-form';

export const useCreateFormContext = () => {
  return useForm({
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
