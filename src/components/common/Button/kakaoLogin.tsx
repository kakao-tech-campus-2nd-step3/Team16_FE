import styled from "@emotion/styled";

interface Props {
  onClick: () => void;
  children?: React.ReactNode;
}

const KakaoLoginButton: React.FC<Props> = ({ onClick, children }) => (
  <StyledButton onClick={onClick}>
    {children}
  </StyledButton>
);

const StyledButton = styled.button`
  background-color: #fee500;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1.2rem;
  color: #000;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  width: 300px;
  height: 50px;
  margin-top: 1.5rem;
  position: relative;

  &:hover {
    background-color: #fdda00;
  }
`;

export default KakaoLoginButton;
