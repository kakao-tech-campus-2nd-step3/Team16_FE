import 'react-datepicker/dist/react-datepicker.css';

import styled from '@emotion/styled';
import React from 'react';
import DatePicker from 'react-datepicker';
import { useFormContext } from 'react-hook-form';

import type { CreateMeetingRequest } from '@/types';

export const TimeRange: React.FC = () => {
  const { setValue, watch } = useFormContext<CreateMeetingRequest>();

  const startTime = watch('startTime');
  const endTime = watch('endTime');

  const selectedStartTime = startTime
    ? new Date(`1970-01-01T${startTime}:00`)
    : new Date(`1970-01-01T09:00:00`);
  const selectedEndTime = endTime
    ? new Date(`1970-01-01T${endTime}:00`)
    : new Date(`1970-01-01T18:00:00`);

  const handleStartTimeChange = (date: Date | null) => {
    if (date) {
      setValue('startTime', date.toTimeString().slice(0, 5));
    }
  };

  const handleEndTimeChange = (date: Date | null) => {
    if (date) {
      setValue('endTime', date.toTimeString().slice(0, 5));
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
