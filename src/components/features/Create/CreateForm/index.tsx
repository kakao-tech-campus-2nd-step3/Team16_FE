import styled from '@emotion/styled';
import React from 'react';

import { DateRange } from './DateRange';
import { Duration } from './Duration';
import { MeetingName } from './MeetingName';
import { TimeRange } from './TimeRange';

export const CreateForm: React.FC = () => {
  return (
    <FormContainer>
      <MeetingName />
      <DateRange />
      <Duration />
      <TimeRange />
    </FormContainer>
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
