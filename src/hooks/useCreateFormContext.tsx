import { useForm, type UseFormReturn } from 'react-hook-form';

export interface CreateFormInputs {
  baseLocation: {
    location_id: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  } | null;
  title: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  durationTime: number;
  startTime: string;
  endTime: string;
}

export const useCreateFormContext = (): UseFormReturn<CreateFormInputs> => {
  return useForm<CreateFormInputs>({
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
