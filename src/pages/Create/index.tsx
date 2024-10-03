import styled from '@emotion/styled';

import { Button } from '@/components/features/Create/Button';
import { Form } from '@/components/features/Create/Form';
import { Map } from '@/components/features/Create/Map';
import { breakpoints } from '@/styles/variants';

export const CreatePage = () => {
  return (
    <Wrapper>
      <Container>
        <Title>모임 생성</Title>
        <BodyContainer>
          <Form />
          <Map />
        </BodyContainer>
        <Button />
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
  max-width: ${breakpoints.xl};
  padding: 60px 20px;
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
  font-size: 28px;
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
