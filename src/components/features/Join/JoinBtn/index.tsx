import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/common/Button';

export const JoinBtn: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ButtonContainer>
      <Button theme="green" onClick={() => navigate(-1)}>
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
