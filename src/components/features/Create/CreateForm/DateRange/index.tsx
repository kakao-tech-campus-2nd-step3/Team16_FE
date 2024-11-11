import 'react-datepicker/dist/react-datepicker.css';
import '../custom-datepicker.css';

import styled from '@emotion/styled';
import dayjs from 'dayjs';
import React from 'react';
import DatePicker from 'react-datepicker';
import { useFormContext } from 'react-hook-form';

import type { CreateMeetingRequest } from '@/types';

export const DateRange: React.FC = () => {
  const { setValue, watch } = useFormContext<CreateMeetingRequest>();

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  const handleDateChange = (date: Date | null, type: 'start' | 'end') => {
    if (date) {
      const formattedDate = dayjs(date).format('YYYY-MM-DD');
      setValue(type === 'start' ? 'startDate' : 'endDate', formattedDate);
    }
  };

  return (
    <FormGroup>
      <FormLabel>날짜 범위</FormLabel>
      <DateRangeContainer>
        <DatePicker
          selected={startDate ? dayjs(startDate).toDate() : undefined}
          onChange={(date) => handleDateChange(date, 'start')}
          selectsStart
          startDate={startDate ? dayjs(startDate).toDate() : undefined}
          endDate={endDate ? dayjs(endDate).toDate() : undefined}
          placeholderText="시작 날짜"
          dateFormat="yyyy.MM.dd"
          className="custom-datepicker"
        />
        <DateSeparator>~</DateSeparator>
        <DatePicker
          selected={endDate ? dayjs(endDate).toDate() : undefined}
          onChange={(date) => handleDateChange(date, 'end')}
          selectsEnd
          startDate={startDate ? dayjs(startDate).toDate() : undefined}
          endDate={endDate ? dayjs(endDate).toDate() : undefined}
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
