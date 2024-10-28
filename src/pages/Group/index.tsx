import styled from '@emotion/styled';

import { Spacing } from '@/components/common/layouts/Spacing';
import { GroupCalendar } from '@/components/features/Group/GroupCalendar';
import { GroupCollectionMenuSection } from '@/components/features/Group/GroupCollectedMenuSection';
import { GroupLeavtBtn } from '@/components/features/Group/GroupLeaveBtn';
import { GroupParticipantsSection } from '@/components/features/Group/GroupParticipantsSection';
import { vars } from '@/styles';

export const GroupPage = () => {
  return (
    <Wrapper>
      {/* title */}
      <GroupParticipantsSection />
      <GroupCalendar />
      <Spacing height={40} />
      <GroupCollectionMenuSection />
      <Positioner>
        <GroupLeavtBtn />
      </Positioner>
      {/*  */}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  max-width: ${vars.breakpoints.lg};
  margin-inline: auto;
`;

const Positioner = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;
