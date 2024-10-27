import styled from '@emotion/styled';

import { Spacing } from '@/components/common/layouts/Spacing';
import { GroupCollectionMenuSection } from '@/components/features/Group/GroupCollectedMenuSection';
import { GroupParticipantsSection } from '@/components/features/Group/GroupParticipantsSection';
import { vars } from '@/styles';

export const GroupPage = () => {
  return (
    <Wrapper>
      {/* title */}
      <GroupParticipantsSection />
      {/* calendar */}
      <Spacing height={40} />
      <GroupCollectionMenuSection />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  max-width: ${vars.breakpoints.lg};
  margin-inline: auto;
`;
