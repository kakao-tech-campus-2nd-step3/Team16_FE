import styled from '@emotion/styled';

interface UserProfileProps {
  profileImage?: string;
}
const UserProfile = ({ profileImage }: UserProfileProps) => {
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

export default UserProfile;
