import styled from '@emotion/styled';

import { CreateBtn } from '@/components/features/Create/CreateButton';
import { CreateForm } from '@/components/features/Create/CreateForm';
import { CreateMap } from '@/components/features/Create/CreateMap';
import { breakpoints } from '@/styles/variants';

export const CreatePage = () => {
  return (
    <Wrapper>
      <Container>
        <Title>모임 생성</Title>
        <BodyContainer>
          <CreateForm />
          <CreateMap />
        </BodyContainer>
        <CreateBtn />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  max-width: ${breakpoints.lg};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: ${breakpoints.md}) {
    padding: 40px 10px;
  }
`;

const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  padding: 0 20px;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  width: 100%;
  justify-content: center;

  @media (max-width: ${breakpoints.md}) {
    flex-direction: column;
    gap: 20px;
  }
`;
