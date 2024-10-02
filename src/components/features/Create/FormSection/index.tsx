import styled from '@emotion/styled';
import React from 'react';
import { FormProvider } from 'react-hook-form';

import { useCreateFormContext } from '@/hooks/useCreateFormContext';

import { DateRange } from './DateRange';
import { Duration } from './Duration';
import { MeetingName } from './MeetingName';
import { TimeRange } from './TimeRange';

export const FormSection: React.FC = () => {
  const methods = useCreateFormContext();

  return (
    <FormProvider {...methods}>
      <FormSectionContainer>
        <MeetingName />
        <DateRange />
        <Duration />
        <TimeRange />
      </FormSectionContainer>
    </FormProvider>
  );
};

const FormSectionContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
