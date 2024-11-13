import styled from '@emotion/styled';
import { FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Spacing } from '@/components/common/layouts/Spacing';
import { GroupConfirmedInfo } from '@/components/features/Group/GroupConfirmedInfo';
import { GroupConfirmedMap } from '@/components/features/Group/GroupConfirmedMap';
import { GroupLeaveBtn } from '@/components/features/Group/GroupLeaveBtn';
import { GroupLinkBtn } from '@/components/features/Group/GroupLinkBtn';
import { GroupParticipantsSection } from '@/components/features/Group/GroupParticipantsSection';
import { GroupTitle } from '@/components/features/Group/GroupTitle';
import { ConfirmBtn } from '@/components/features/Leader/ConfirmBtn';
import { GroupHostCalendar } from '@/components/features/Leader/GroupHostCalendar';
import { GroupHostCollectionMenuSection } from '@/components/features/Leader/GroutHostCellectionMenuSeciton';
import { useConfirmFormContext } from '@/hooks/useConfirmFormContext';
import { useGetMeetingId } from '@/hooks/useGetMeetingId';
import { vars } from '@/styles';

export const LeaderPage = () => {
  const meetingId = useGetMeetingId();
  const methods = useConfirmFormContext();
  return (
    <Wrapper>
      <FormProvider {...methods}>
        <GroupTitle>
          <LinkWrapper>
            <GroupLinkBtn />
            <Link to={`/edit${meetingId}`}>입력 정보 수정하기 &rarr;</Link>
          </LinkWrapper>
        </GroupTitle>
        <Spacing height={20} />

        <GroupConfirmedInfo />

        <GroupConfirmedMap />

        <GroupParticipantsSection />
        <Spacing height={80} />

        <GroupHostCalendar />
        <Spacing height={80} />

        <GroupHostCollectionMenuSection />
        <Spacing height={40} />

        <Positioner>
          <ConfirmBtn />
          <GroupLeaveBtn />
        </Positioner>
        <Spacing height={40} />
      </FormProvider>
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
  gap: 1rem;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
