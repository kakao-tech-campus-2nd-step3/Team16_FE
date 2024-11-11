import 'react-datepicker/dist/react-datepicker.css';
import '../custom-datepicker.css';

import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useFormContext } from 'react-hook-form';

import type { CreateMeetingRequest } from '@/types';

export const TimeRange: React.FC = () => {
  const { setValue, getValues, watch } = useFormContext<CreateMeetingRequest>();

  useEffect(() => {
    if (!getValues('startTime')) setValue('startTime', '09:00:00');
    if (!getValues('endTime')) setValue('endTime', '18:00:00');
  }, [setValue, getValues]);

  const startTime = watch('startTime') || '09:00:00';
  const endTime = watch('endTime') || '18:00:00';

  const selectedStartTime = new Date(`1970-01-01T${startTime}`);
  const selectedEndTime = new Date(`1970-01-01T${endTime}`);

  const handleStartTimeChange = (date: Date | null) => {
    if (date) {
      const selectedTime = date.toTimeString().slice(0, 8);

      if (endTime && selectedTime >= endTime) {
        const endDate = new Date(date);
        endDate.setHours(endDate.getHours() + 1);
        const newEndTime = endDate.toTimeString().slice(0, 8);
        setValue('endTime', newEndTime);
      }

      setValue('startTime', selectedTime);
    }
  };

  const handleEndTimeChange = (date: Date | null) => {
    if (date) {
      const selectedTime = date.toTimeString().slice(0, 8);

      if (startTime && selectedTime <= startTime) {
        const startDate = new Date(date);
        startDate.setHours(startDate.getHours() - 1);
        const newStartTime = startDate.toTimeString().slice(0, 8);
        setValue('startTime', newStartTime);
      }

      setValue('endTime', selectedTime);
    }
  };

  return (
    <FormGroup>
      <FormLabel>시간 범위</FormLabel>
      <TimeRangeContainer>
        <DatePicker
          selected={selectedStartTime}
          onChange={handleStartTimeChange}
          showTimeSelect
          showTimeSelectOnly
          showTimeCaption={false}
          timeIntervals={30}
          dateFormat="HH:mm"
          timeFormat="HH:mm"
        />
        <TimeSeparator>~</TimeSeparator>
        <DatePicker
          selected={selectedEndTime}
          onChange={handleEndTimeChange}
          showTimeSelect
          showTimeSelectOnly
          showTimeCaption={false}
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
