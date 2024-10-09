import styled from '@emotion/styled';
import React from 'react';
import { type FieldErrors, useFormContext } from 'react-hook-form';

import { Button } from '@/components/common/Button';
import { type CreateFormInputs } from '@/hooks/useCreateFormContext';

export const CreateBtn: React.FC = () => {
  const { handleSubmit, getValues } = useFormContext<CreateFormInputs>();

  const handleFormSubmit = () => {
    const values = getValues();
    const { isValid, errorMessage } = validateCreateForm(values);

    if (!isValid) {
      alert(errorMessage);
      return;
    }

    console.log('Form validation passed and submitted!', values);
    alert('모임이 생성되었습니다.');
  };

  const handleFormError = (errors: FieldErrors<CreateFormInputs>) => {
    console.error('Form validation errors:', errors);
    alert('폼 입력을 확인해주세요.');
  };

  return (
    <ButtonContainer>
      <Button theme="green" onClick={handleSubmit(handleFormSubmit, handleFormError)}>
        생성하기
      </Button>
      <Button theme="ivory">취소</Button>
    </ButtonContainer>
  );
};

const validateCreateForm = (
  values: CreateFormInputs,
): { errorMessage?: string; isValid: boolean } => {
  if (!values.meetingName || values.meetingName.trim() === '') {
    return {
      errorMessage: '모임 이름을 입력해주세요.',
      isValid: false,
    };
  }

  if (!values.startDate || !values.endDate) {
    return {
      errorMessage: '시작일과 종료일을 입력해주세요.',
      isValid: false,
    };
  }

  if (values.startDate > values.endDate) {
    return {
      errorMessage: '종료일은 시작일보다 이후여야 합니다.',
      isValid: false,
    };
  }

  if (!values.duration || values.duration < 1) {
    return {
      errorMessage: '모임 소요 시간을 1시간 이상으로 설정해주세요.',
      isValid: false,
    };
  }

  if (!values.startTime || !values.endTime) {
    return {
      errorMessage: '모임 시작 시간과 종료 시간을 입력해주세요.',
      isValid: false,
    };
  }

  if (values.startTime >= values.endTime) {
    return {
      errorMessage: '종료 시간은 시작 시간보다 이후여야 합니다.',
      isValid: false,
    };
  }

  return {
    isValid: true,
  };
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  gap: 20px;
`;
