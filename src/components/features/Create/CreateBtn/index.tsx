import styled from '@emotion/styled';
import React from 'react';
import { type FieldErrors, useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useCreateMeeting } from '@/api/hooks/useCreateMeeting';
import { Button } from '@/components/common/Button';
import { type CreateFormInputs } from '@/hooks/useCreateFormContext';
import { RouterPath } from '@/routes/path';

import { validateCreateForm } from './validation';

export const CreateBtn: React.FC = () => {
  const { handleSubmit, getValues } = useFormContext<CreateFormInputs>();
  const navigate = useNavigate();
  const { mutate: createMeeting } = useCreateMeeting();

  const handleFormSubmit = () => {
    const values = getValues();
    const { isValid, errorMessage } = validateCreateForm(values);

    if (!isValid) {
      alert(errorMessage);
      return;
    }

    const meetingData = {
      title: values.meetingName,
      startDate: values.startDate?.toISOString().split('T')[0] || '',
      endDate: values.endDate?.toISOString().split('T')[0] || '',
      durationTime: values.duration,
      startTime: values.startTime,
      endTime: values.endTime,
    };

    createMeeting(meetingData, {
      onSuccess: () => {
        alert('모임이 성공적으로 생성되었습니다!');
        navigate(RouterPath.leader);
      },
      onError: () => {
        alert('모임 생성 중 오류가 발생했습니다.');
      },
    });
  };

  const handleFormError = (errors: FieldErrors<CreateFormInputs>) => {
    console.error('Form validation errors:', errors);
    alert('폼 입력을 확인해주세요.');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <ButtonContainer>
      <Button theme="green" onClick={handleSubmit(handleFormSubmit, handleFormError)}>
        생성하기
      </Button>
      <Button theme="ivory" onClick={handleCancel}>
        취소
      </Button>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  gap: 20px;
`;
