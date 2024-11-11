import styled from '@emotion/styled';

import { useGetMeetingInfo } from '@/api/hooks/useGetMeetingInfo';
import { useGetMeetingId } from '@/hooks/useGetMeetingId';

type Props = {
  children: React.ReactNode;
};

export const GroupTitle: React.FC<Props> = ({ children }) => {
  const meetingId = useGetMeetingId();
  const { data: meetingInfo, status } = useGetMeetingInfo(meetingId || '');

  if (status === 'pending') return <div>Loading...</div>;
  if (status === 'error') return <div>Error...</div>;

  const { title } = meetingInfo;

  return (
    <>
      <Container>
        <MeetingTitle>{title}</MeetingTitle>
        {children}
      </Container>
      <hr />
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MeetingTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  user-select: none;
  flex-shrink: 0;
`;
