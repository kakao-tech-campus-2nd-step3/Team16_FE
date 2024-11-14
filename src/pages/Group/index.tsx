import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { Spacing } from '@/components/common/layouts/Spacing';
import { GroupCalendar } from '@/components/features/Group/GroupCalendar';
import { GroupCollectionMenuSection } from '@/components/features/Group/GroupCollectedMenuSection';
import { GroupConfirmedInfo } from '@/components/features/Group/GroupConfirmedInfo';
import { GroupConfirmedMap } from '@/components/features/Group/GroupConfirmedMap';
import { GroupLeaveBtn } from '@/components/features/Group/GroupLeaveBtn';
import { GroupLinkBtn } from '@/components/features/Group/GroupLinkBtn';
import { GroupParticipantsSection } from '@/components/features/Group/GroupParticipantsSection';
import { GroupTitle } from '@/components/features/Group/GroupTitle';
import { useGetMeetingId } from '@/hooks/useGetMeetingId';
import { vars } from '@/styles';

export const GroupPage = () => {
  const meetingId = useGetMeetingId();
  return (
    <Wrapper>
      <GroupTitle>
        <LinkWrapper>
          <GroupLinkBtn />
          <Link to={`/edit/${meetingId}`}>입력 정보 수정하기 &rarr;</Link>
        </LinkWrapper>
      </GroupTitle>
      <Spacing height={20} />

      <GroupConfirmedInfo />

      <GroupConfirmedMap />

      <GroupParticipantsSection />
      <Spacing height={80} />

      <GroupCalendar />
      <Spacing height={80} />

      <GroupCollectionMenuSection />
      <Spacing height={40} />

      <Positioner>
        <GroupLeaveBtn />
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

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
