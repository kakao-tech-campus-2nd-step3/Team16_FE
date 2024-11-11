import 'react-datepicker/dist/react-datepicker.css';
import '../custom-datepicker.css';

import styled from '@emotion/styled';
import React from 'react';
import DatePicker from 'react-datepicker';
import { useFormContext } from 'react-hook-form';

import type { CreateMeetingRequest } from '@/types';

export const DateRange: React.FC = () => {
  const { setValue, watch } = useFormContext<CreateMeetingRequest>();

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  const formatDate = (date: Date | null) => {
    if (!date) return undefined;
    return date.toISOString().split('T')[0];
  };

  return (
    <FormGroup>
      <FormLabel>날짜 범위</FormLabel>
      <DateRangeContainer>
        <DatePicker
          selected={startDate ? new Date(startDate) : undefined}
          onChange={(date: Date | null) => setValue('startDate', formatDate(date))}
          selectsStart
          startDate={startDate ? new Date(startDate) : undefined}
          endDate={endDate ? new Date(endDate) : undefined}
          placeholderText="시작 날짜"
          dateFormat="yyyy.MM.dd"
          className="custom-datepicker"
        />
        <DateSeparator>~</DateSeparator>
        <DatePicker
          selected={endDate ? new Date(endDate) : undefined}
          onChange={(date: Date | null) => setValue('endDate', formatDate(date))}
          selectsEnd
          startDate={startDate ? new Date(startDate) : undefined}
          endDate={endDate ? new Date(endDate) : undefined}
          placeholderText="종료 날짜"
          dateFormat="yyyy.MM.dd"
          className="custom-datepicker"
        />
      </DateRangeContainer>
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

const DateRangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DateSeparator = styled.span`
  margin: 0 10px;
  font-size: 1.25rem;
  color: lightgray;
`;
