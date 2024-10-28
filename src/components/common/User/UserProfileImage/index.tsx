import styled from '@emotion/styled';

const profileSize = {
  sm: '40px', //default
  md: '48px',
};

const defaultProfileImageUrl = '/assets/images/defaultUser/default-user.png';

type Props = {
  profileImageUrl?: string;
  size?: keyof typeof profileSize;
};

export const UserProfileImage: React.FC<Props> = ({
  profileImageUrl = defaultProfileImageUrl,
  size,
}) => {
  return (
    <StyledUserProfile
      profileImage={profileImageUrl}
      size={size || 'sm'}
      style={{
        backgroundImage: `url(${defaultProfileImageUrl})`,
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
`;
