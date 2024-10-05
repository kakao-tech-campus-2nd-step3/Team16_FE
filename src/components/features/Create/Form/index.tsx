import styled from '@emotion/styled';
import React from 'react';
import { FormProvider } from 'react-hook-form';

import { useCreateFormContext } from '@/hooks/useCreateFormContext';

import { DateRange } from './DateRange';
import { Duration } from './Duration';
import { MeetingName } from './MeetingName';
import { TimeRange } from './TimeRange';

export const Form: React.FC = () => {
  const methods = useCreateFormContext();

  return (
    <FormProvider {...methods}>
      <FormContainer>
        <MeetingName />
        <DateRange />
        <Duration />
        <TimeRange />
      </FormContainer>
    </FormProvider>
  );
};

const FormContainer = styled.div`
  flex: 1;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  box-sizing: border-box;
`;
