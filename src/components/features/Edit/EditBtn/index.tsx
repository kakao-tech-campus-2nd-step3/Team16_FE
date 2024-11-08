import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useUpdatePersonal } from '@/api/hooks/useUpdatePersonal';
import { Button } from '@/components/common/Button';
import { useJoinFormContext } from '@/hooks/useJoinFormContext';
import { RouterPath } from '@/routes/path';
import type { JoinMeetingRequest } from '@/types';

type EditBtnProps = {
  meetingId: string;
};

export const EditBtn: React.FC<EditBtnProps> = ({ meetingId }) => {
  const navigate = useNavigate();
  const { mutate: join } = useUpdatePersonal();
  const { meetingData } = useJoinFormContext();

  const handleFormSubmit = () => {
    const { times, preferences, nonPreferences } = meetingData[meetingId];
    const personalData: JoinMeetingRequest = {
      times,
      preferences,
      nonPreferences,
    };

    if (!meetingId) {
      alert('유효한 모임 ID가 없습니다.');
      return;
    }

    join(
      { meetingId, personalData },
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

  return (
    <ButtonContainer>
      <Button theme="green" onClick={handleFormSubmit}>
        수정하기
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
