import styled from '@emotion/styled';

import { useGetConfirmInfo } from '@/api/hooks/Meeting/useGetConfirmInfo';

export const GroupConfirmedInfo: React.FC = () => {
  const { data: confirmedInfo, status } = useGetConfirmInfo({ meetingId: '1' });

  if (status === 'pending') return <p>Loading...</p>;

  if (status === 'error') return <p>error</p>;

  if (!confirmedInfo) return null;

  const { confirmedDateTime } = confirmedInfo;

  const displayDateTime = `${new Date(confirmedDateTime).toLocaleString()} 에 만나요!`;

  return (
    <ConformInfoSection>
      <p>{displayDateTime}</p>
    </ConformInfoSection>
  );
};

const ConformInfoSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fcf8f3;
  padding: 2rem;
  border-radius: 1rem;
  font-size: 1.3rem;
  font-weight: 500;
`;
