import styled from '@emotion/styled';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export const MeetingName: React.FC = () => {
  const { register } = useFormContext();

  return (
    <FormGroup>
      <FormLabel htmlFor="meetingName">모임 이름</FormLabel>
      <FormInput
        type="text"
        id="meetingName"
        placeholder="모임 이름을 입력해주세요"
        {...register('meetingName')}
      />
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

const FormInput = styled.input`
  padding: 10px;
  font-size: 0.9rem;
  font-family: 'Pretendard', sans-serif;
  border: 1px solid lightgray;
  border-radius: 7px;
  color: darkgray;
`;
