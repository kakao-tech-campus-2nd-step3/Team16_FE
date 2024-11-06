import styled from '@emotion/styled';
import React from 'react';
import { type FieldErrors, useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { useJoinMeeting } from '@/api/hooks/useJoinMeeting';
import { Button } from '@/components/common/Button';
import { RouterPath } from '@/routes/path';
import type { JoinMeetingRequest, SelectedTime } from '@/types';

type JoinBtnProps = {
  times: SelectedTime[];
};

export const JoinBtn: React.FC<JoinBtnProps> = ({ times }) => {
  const { handleSubmit, getValues } = useFormContext<JoinMeetingRequest>();
  const navigate = useNavigate();
  const { meetingId } = useParams<{ meetingId: string }>();
  const { mutate: join } = useJoinMeeting();

  const handleFormSubmit = () => {
    const values = {
      ...getValues(),
      times,
    };
    console.log('Form values on submit:', values);

    if (!meetingId) {
      alert('유효한 모임 ID가 없습니다.');
      return;
    }

    join(
      { meetingId, joinData: values },
      {
        onSuccess: () => {
          alert('참여 정보가 성공적으로 전송되었습니다!');
          navigate(`${RouterPath.group}/${meetingId}`);
        },
        onError: () => {
          alert('참여 정보 전송에 실패했습니다.');
        },
      },
    );
  };

  const handleFormError = (errors: FieldErrors<JoinMeetingRequest>) => {
    console.error('Form validation errors:', errors);
    alert('폼 입력을 확인해주세요.');
  };

  return (
    <ButtonContainer>
      <Button theme="green" onClick={handleSubmit(handleFormSubmit, handleFormError)}>
        참여하기
      </Button>
      <Button theme="ivory" onClick={() => navigate(-1)}>
        취소
      </Button>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: right;
  gap: 20px;
`;
