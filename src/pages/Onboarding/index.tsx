import styled from '@emotion/styled';
import { useState } from 'react';

const onboardingImages = [
  '/assets/images/onboarding/image1.svg',
  '/assets/images/onboarding/image2.svg',
  '/assets/images/onboarding/image3.svg',
  '/assets/images/onboarding/image4.svg',
];

const onboardingDescriptions = [
  {
    title: '개인 캘린더 관리',
    subtitle: '카카오의 톡 캘린더와 연동하여 개인 일정을 편리하게 관리할 수 있어요!',
  },
  {
    title: '선호/비선호 음식 관리',
    subtitle: '선호/비선호 하는 음식을 입력해 밥약속에 반영할 수 있어요!',
  },
  {
    title: '최적의 일정 추천',
    subtitle: '모임 내의 사용자들의 공통된 가능 시간을 추천해줘요!',
  },
  {
    title: '밥약속 장소 추천',
    subtitle: '모임 정보를 기반으로 카카오맵으로 밥약속 장소를 추천해줘요!',
  },
];

const OnboardingPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % onboardingImages.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? onboardingImages.length - 1 : prev - 1
    );
  };

  return (
    <OnboardingContainer>
      <ContentWrapper>
        <ImageContainer>
          <OnboardingImage src={onboardingImages[currentImageIndex]} alt="Onboarding" />
        </ImageContainer>
        <DescriptionContainer>
          <ArrowButton direction="left" onClick={handlePrev}>{"<"}</ArrowButton>
          <TextContent>
            <Title>{onboardingDescriptions[currentImageIndex].title}</Title>
            <Subtitle>{onboardingDescriptions[currentImageIndex].subtitle}</Subtitle>
            <KakaoLoginButton>
              <KakaoIcon src="/icons/kakao-icon.svg" alt="카카오 로그인" />
              <Label>카카오 로그인</Label>
            </KakaoLoginButton>
            <Description>카카오 로그인으로 밥팅을 시작해보세요!</Description>
          </TextContent>
          <ArrowButton direction="right" onClick={handleNext}>{">"}</ArrowButton>
        </DescriptionContainer>
      </ContentWrapper>
    </OnboardingContainer>
  );
};

const Description = styled.p`
  font-size: 0.9rem;
  color: #888;
  margin-top: 1rem; /* 버튼과의 간격 */
  text-align: center;
`;

interface ArrowButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

const OnboardingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  max-width: 1200px; 
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const OnboardingImage = styled.img`
  max-width: 500px; 
  width: 100%;
  height: auto;
`;

const DescriptionContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 수평 중앙 정렬 */
  justify-content: center; /* 수직 중앙 정렬 */
  max-width: 380px;
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 1.6; 
  word-break: break-word;
`;

const ArrowButton = styled.button<ArrowButtonProps>`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  position: absolute;
  top: 50%; 
  transform: translateY(-50%);
  left: ${props => props.direction === 'left' ? '10px' : 'auto'};
  right: ${props => props.direction === 'right' ? '10px' : 'auto'};
`;

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
  width: 300px; /* 버튼의 고정 너비 */
  height: 50px;
  margin-top: 1.5rem; /* 텍스트와 버튼 간격 */
  position: relative;

  &:hover {
    background-color: #fdda00;
  }
`;

const KakaoIcon = styled.img`
  position: absolute;
  left: 10px;
  width: 24px;
  height: 24px;
`;

const Label = styled.span`
  font-size: 1.2rem;
  color: #000;
  margin-left: 40px;
`;

export { OnboardingPage };
