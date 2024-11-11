import 'react-datepicker/dist/react-datepicker.css';
import '../custom-datepicker.css';

import styled from '@emotion/styled';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useFormContext } from 'react-hook-form';

import type { CreateMeetingRequest } from '@/types';

export const TimeRange: React.FC = () => {
  const { setValue, watch } = useFormContext<CreateMeetingRequest>();

  const startTime = watch('startTime');
  const endTime = watch('endTime');

  useEffect(() => {
    if (!startTime) setValue('startTime', '09:00:00');
    if (!endTime) setValue('endTime', '18:00:00');
  }, [setValue, startTime, endTime]);

  const selectedStartTime = dayjs(`1970-01-01T${startTime}`).toDate();
  const selectedEndTime = dayjs(`1970-01-01T${endTime}`).toDate();

  const handleTimeChange = (date: Date | null, type: 'start' | 'end') => {
    if (date) {
      const selectedTime = dayjs(date).format('HH:mm:ss');

      if (type === 'start') {
        if (
          endTime &&
          dayjs(`1970-01-01T${selectedTime}`).isAfter(dayjs(`1970-01-01T${endTime}`))
        ) {
          const newEndTime = dayjs(date).add(1, 'hour').format('HH:mm:ss');
          setValue('endTime', newEndTime);
        }
        setValue('startTime', selectedTime);
      } else {
        if (
          startTime &&
          dayjs(`1970-01-01T${selectedTime}`).isBefore(dayjs(`1970-01-01T${startTime}`))
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
