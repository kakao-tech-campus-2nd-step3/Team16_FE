import 'react-datepicker/dist/react-datepicker.css';
import '../custom-datepicker.css';

import styled from '@emotion/styled';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useFormContext } from 'react-hook-form';

import type { CreateMeetingRequest } from '@/types';

const INITIAL_DATE = '1970-01-01';
const INITIAL_START = '09:00:00';
const INITIAL_END = '18:00:00';

export const TimeRange: React.FC = () => {
  const { setValue, getValues, watch } = useFormContext<CreateMeetingRequest>();

  useEffect(() => {
    if (!getValues('startTime')) setValue('startTime', INITIAL_START);
    if (!getValues('endTime')) setValue('endTime', INITIAL_END);
  }, [setValue, getValues]);

  const startTime = watch('startTime') || INITIAL_START;
  const endTime = watch('endTime') || INITIAL_END;

  const selectedStartTime = dayjs(`${INITIAL_DATE}T${startTime}`).toDate();
  const selectedEndTime = dayjs(`${INITIAL_DATE}T${endTime}`).toDate();

  const handleTimeChange = (date: Date | null, type: 'start' | 'end') => {
    if (date) {
      const selectedTime = dayjs(date).format('HH:mm:ss');

      if (type === 'start') {
        if (
          endTime &&
          dayjs(`1970-01-01T${selectedTime}`).isAfter(dayjs(`${INITIAL_DATE}T${endTime}`))
        ) {
          const newEndTime = dayjs(date).add(1, 'hour').format('HH:mm:ss');
          setValue('endTime', newEndTime);
        }
        setValue('startTime', selectedTime);
      } else {
        if (
          startTime &&
          dayjs(`1970-01-01T${selectedTime}`).isBefore(dayjs(`${INITIAL_DATE}T${startTime}`))
        ) {
          const newStartTime = dayjs(date).subtract(1, 'hour').format('HH:mm:ss');
          setValue('startTime', newStartTime);
        }
        setValue('endTime', selectedTime);
      }
    }
  };

  return (
    <FormGroup>
      <FormLabel>시간 범위</FormLabel>
      <TimeRangeContainer>
        <DatePicker
          selected={selectedStartTime}
          onChange={(date) => handleTimeChange(date, 'start')}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          dateFormat="HH:mm"
          timeFormat="HH:mm"
        />
        <TimeSeparator>~</TimeSeparator>
        <DatePicker
          selected={selectedEndTime}
          onChange={(date) => handleTimeChange(date, 'end')}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          dateFormat="HH:mm"
          timeFormat="HH:mm"
        />
      </TimeRangeContainer>
    </FormGroup>
  );
};

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormLabel = styled.label`
  font-weight: 600;
  font-size: 1.25rem;
  display: block;
`;

const TimeRangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TimeSeparator = styled.span`
  margin: 0 10px;
  font-size: 1.25rem;
  color: lightgray;
`;
