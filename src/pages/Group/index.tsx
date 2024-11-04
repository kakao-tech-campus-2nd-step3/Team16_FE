import styled from '@emotion/styled';

import { useGetPermission } from '@/api/hooks/useGetPermission';
import { Spacing } from '@/components/common/layouts/Spacing';
import { GroupCalendar } from '@/components/features/Group/GroupCalendar';
import { GroupCollectionMenuSection } from '@/components/features/Group/GroupCollectedMenuSection';
import { GroupLeavtBtn } from '@/components/features/Group/GroupLeaveBtn';
import { GroupParticipantsSection } from '@/components/features/Group/GroupParticipantsSection';
import { useGetMeetingId } from '@/hooks/useGetMeetingId';
import { vars } from '@/styles';

export const GroupPage = () => {
  const meetingId = useGetMeetingId(); //TODO: 하위 컴포넌트에서 호출중임 수정 필요
  const { data } = useGetPermission(meetingId);

  if (!data) return null;

  return (
    <Wrapper>
      {/* title */}
      <GroupParticipantsSection />
      <Spacing height={80} />
      <GroupCalendar />
      <Spacing height={80} />
      <GroupCollectionMenuSection />
      <Positioner>
        <GroupLeavtBtn />
      </Positioner>
      <Spacing height={40} />
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
