import styled from '@emotion/styled';

import { GroupParticipantsSection } from '@/components/features/Group/GroupParticipantsSection';
import { vars } from '@/styles';

export const GroupPage = () => {
  return (
    <Wrapper>
      {/* title */}
      <GroupParticipantsSection />
      {/* calendar */}
      {/*  */}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  max-width: ${vars.breakpoints.lg};
  margin-inline: auto;
`;
