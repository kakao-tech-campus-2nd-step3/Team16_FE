import styled from '@emotion/styled';

import { useGetConfirmInfo } from '@/api/hooks/Meeting/useGetConfirmInfo';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useGetMeetingId } from '@/hooks/useGetMeetingId';

export const GroupConfirmedInfo: React.FC = () => {
  const meetingId = useGetMeetingId();
  const { data: confirmedInfo, status } = useGetConfirmInfo({ meetingId });

  if (status === 'pending') return <p>Loading...</p>;

  if (status === 'error') return <p>error</p>;

  if (!confirmedInfo.confirmedDateTime) return null;

  const { confirmedDateTime } = confirmedInfo;

  const displayDateTime = `${new Date(confirmedDateTime).toLocaleString()} 에 만나요!`;

  return (
    <>
      <ConformInfoSection>
        <p>{displayDateTime}</p>
      </ConformInfoSection>
      <Spacing height={20} />
    </>
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
