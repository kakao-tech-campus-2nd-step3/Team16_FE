import styled from '@emotion/styled';

import { UserProfileImage } from '../UserProfileImage';

type Props = {
  profileImageUrl: string;
  nickname: string;
};

export const Participant: React.FC<Props> = ({ nickname, profileImageUrl }) => {
  return (
    <StyledParticipant>
      <UserProfileImage profileImageUrl={profileImageUrl} size="md" />
      <Nickname>{nickname}</Nickname>
    </StyledParticipant>
  );
};

const StyledParticipant = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Nickname = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
`;
