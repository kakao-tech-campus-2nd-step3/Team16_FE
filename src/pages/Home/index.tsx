import styled from '@emotion/styled';

import { MyCalendar } from '@/components/features/Home/MyCalendar';
import { vars } from '@/styles';

export const HomePage = () => {
  return (
    <Wrapper>
      <MyCalendar />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  max-width: ${vars.breakpoints.lg};
  margin-inline: auto;
`;
