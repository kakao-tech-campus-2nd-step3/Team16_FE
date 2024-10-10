import styled from '@emotion/styled';

const KakaoLoginButton = styled.button`
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

interface Props {
  onClick: () => void;
}

const KakaoLogin: React.FC<Props> = ({ onClick }) => (
  <KakaoLoginButton onClick={onClick}>
    <img src="/icons/kakao-icon.svg" alt="카카오 로그인" style={{ position: 'absolute', left: '10px', width: '24px', height: '24px' }} />
    카카오 로그인
  </KakaoLoginButton>
);

export default KakaoLogin;
