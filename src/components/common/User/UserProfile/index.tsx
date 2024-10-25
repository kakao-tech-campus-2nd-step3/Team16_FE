import styled from '@emotion/styled';

const profileSize = {
  sm: '40px', //default
  md: '48px',
};

type Props = {
  profileImage?: string;
  size?: keyof typeof profileSize;
};

export const UserProfileImage: React.FC<Props> = ({ profileImage, size }) => {
  return (
    <StyledUserProfile
      profileImage={profileImage}
      size={size || 'sm'}
      style={{
        backgroundImage: `url(${profileImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  );
};

const StyledUserProfile = styled.div<{
  size: keyof typeof profileSize;
  profileImage?: string;
}>`
  width: ${({ size }) => profileSize[size]};
  height: ${({ size }) => profileSize[size]};
  border-radius: 50%;
  background-color: black;
`;
