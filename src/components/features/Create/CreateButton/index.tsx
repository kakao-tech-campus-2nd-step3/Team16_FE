import styled from '@emotion/styled';

import { Button } from '@/components/common/Button';

export const CreateBtn = () => {
  return (
    <ButtonContainer>
      <Button theme="green">생성하기</Button>
      <Button theme="ivory">취소</Button>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  gap: 20px;
`;
