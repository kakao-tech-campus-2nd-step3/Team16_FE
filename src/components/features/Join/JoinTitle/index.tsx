import styled from '@emotion/styled';
import React from 'react';

export const JoinTitle: React.FC = () => {
  const title = '철수 모임';

  return (
    <TitleConatiner>
      <Title>{title}</Title>
      <Divider />
    </TitleConatiner>
  );
};

const TitleConatiner = styled.div`
  flex-direction: column;
  display: flex;
  width: 100%;
  gap: 20px;
`;

const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: black;
`;
