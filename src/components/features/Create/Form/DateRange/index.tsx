import 'react-datepicker/dist/react-datepicker.css';
import './custom-datepicker.css';

import styled from '@emotion/styled';
import React from 'react';
import DatePicker from 'react-datepicker';
import { useFormContext } from 'react-hook-form';

export const DateRange: React.FC = () => {
  const { setValue, watch } = useFormContext();
  const startDate = watch('startDate');
  const endDate = watch('endDate');

  return (
    <FormGroup>
      <FormLabel>날짜 범위</FormLabel>
      <DateRangeContainer>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setValue('startDate', date ?? undefined)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="시작 날짜"
          dateFormat="yyyy.MM.dd"
          className="custom-datepicker"
        />
        <DateSeparator>~</DateSeparator>
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => setValue('endDate', date ?? undefined)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
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
  font-family: 'Pretendard', sans-serif;
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
