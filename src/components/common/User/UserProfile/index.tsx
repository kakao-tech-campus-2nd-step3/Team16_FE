import styled from '@emotion/styled';

type Props = {
  profileImage?: string;
};

export const UserProfile: React.FC<Props> = ({ profileImage }) => {
  return (
    <StyledUserProfile
      style={{
        backgroundImage: `url(${profileImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  );
};

const StyledUserProfile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: black;
`;
