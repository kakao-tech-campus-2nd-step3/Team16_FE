import styled from '@emotion/styled';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import type { CreateMeetingRequest } from '@/types';

export const TimeRange: React.FC = () => {
  const { register } = useFormContext<CreateMeetingRequest>();

  return (
    <FormGroup>
      <FormLabel htmlFor="startTime">시간 범위</FormLabel>
      <TimeRangeContainer>
        <TimeInput id="startTime" type="time" step={600} {...register('startTime')} />
        <TimeSeparator>~</TimeSeparator>
        <TimeInput id="endTime" type="time" step={600} {...register('endTime')} />
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
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  display: block;
`;

const TimeRangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TimeInput = styled.input`
  flex: 1;
  padding: 10px;
  font-family: 'Pretendard', sans-serif;
  font-size: 0.9rem;
  border: 1px solid lightgray;
  border-radius: 7px;
  color: darkgray;
`;

const TimeSeparator = styled.span`
  margin: 0 10px;
  font-size: 1.25rem;
  color: lightgray;
`;
