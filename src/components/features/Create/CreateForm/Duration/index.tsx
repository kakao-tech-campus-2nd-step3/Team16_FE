import styled from '@emotion/styled';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import type { CreateFormInputs } from '@/hooks/useCreateFormContext';

export const Duration: React.FC = () => {
  const { register } = useFormContext<CreateFormInputs>();

  return (
    <FormGroup>
      <FormLabel htmlFor="duration">예정 소요 시간</FormLabel>
      <FormSelect id="duration" {...register('duration')}>
        {Array.from({ length: 24 }, (_, i) => i + 1).map((hour) => (
          <option key={hour} value={hour}>
            {hour}시간
          </option>
        ))}
      </FormSelect>
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

const FormSelect = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 0.9rem;
  font-family: 'Pretendard', sans-serif;
  border: 1px solid lightgray;
  border-radius: 7px;
  color: darkgray;
`;
