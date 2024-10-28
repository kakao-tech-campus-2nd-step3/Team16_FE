import styled from '@emotion/styled';

import { Spacing } from '@/components/common/layouts/Spacing';
import { MyCalendar } from '@/components/features/Home/MyCalendar';
import { MyMeetingList } from '@/components/features/Home/MyMeetingListSection';
import { vars } from '@/styles';

export const HomePage = () => {
  return (
    <Wrapper>
      <MyCalendar />
      <Spacing height={52} />
      <MyMeetingList />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  max-width: ${vars.breakpoints.lg};
  margin-inline: auto;
`;
