import styled from '@emotion/styled';

import { MyMeetingList } from '@/components/features/Home/MyMeetingList';
import { vars } from '@/styles';

export const HomePage = () => {
  return (
    <Wrapper>
      <MyMeetingList />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  max-width: ${vars.breakpoints.lg};
  margin-inline: auto;
`;
