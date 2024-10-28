import styled from '@emotion/styled';

export const Button = () => {
  return (
    <ButtonContainer>
      <CreateButton>생성하기</CreateButton>
      <CancelButton>취소</CancelButton>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  gap: 20px;
`;

const CreateButton = styled.button`
  padding: 12px 24px;
  background-color: #698474;
  color: white;
  font-size: 16px;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #567b65;
  }
`;

const CancelButton = styled.button`
  padding: 12px 24px;
  background-color: #698474;
  color: white;
  font-size: 16px;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #567b65;
  }
`;
