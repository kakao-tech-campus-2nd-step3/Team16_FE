import styled from '@emotion/styled';

import { useGetParticipant } from '@/api/hooks/Meeting/useGetParticipant';
import { Participant } from '@/components/common/User/Participant';
import { useGetMeetingId } from '@/hooks/useGetMeetingId';

export const GroupParticipantsSection: React.FC = () => {
  const meetingId = useGetMeetingId();

  const { data: participants, status } = useGetParticipant(meetingId);

  if (status === 'pending') return <div>Loading...</div>;
  if (status === 'error') return <div>Error</div>;

  return (
    <section>
      <Container>
        {participants.map(({ member_id, nickname, profile_image_url }) => (
          <Participant key={member_id} nickname={nickname} profileImageUrl={profile_image_url} />
        ))}
      </Container>
    </section>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 2rem 5rem;
`;
