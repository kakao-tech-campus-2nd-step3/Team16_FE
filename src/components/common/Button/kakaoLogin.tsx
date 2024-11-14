import styled from "@emotion/styled";
import React from "react";

interface Props {
  onClick: () => void;
}

export const KakaoLoginButton: React.FC<Props> = ({ onClick }) => (
  <StyledButton onClick={onClick}>
    <KakaoIcon src="/icons/kakao-icon.svg" alt="카카오 로그인" />
    <Label>카카오 로그인</Label>
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
  position: relative; // 아이콘의 절대 위치를 위한 상대 위치 기준

  &:hover {
    background-color: #fdda00;
  }
`;

const KakaoIcon = styled.img`
  position: absolute;
  left: 10px; // 버튼의 왼쪽 끝에 고정
  width: 24px;
  height: 24px;
`;

const Label = styled.span`
  font-size: 1.2rem;
  color: #000;
`;
