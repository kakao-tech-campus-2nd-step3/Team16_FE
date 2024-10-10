import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { useGetMyMeeting } from '@/api/hooks/useGetMyMeetings';
import { Container } from '@/components/common/layouts/Container';
import { Spacing } from '@/components/common/layouts/Spacing';
import { RouterPath } from '@/routes/path';

export const MyMeetingList = () => {
  const { data, status } = useGetMyMeeting();

  if (status === 'error') {
    return <div>Error</div>;
  }

  if (status === 'pending') {
    return <div>Loading...</div>;
  }

  const { confirmedMeetings, nonConfirmedMeetings } = data;

  return (
    <Wrapper>
      <Container maxWidth="" flexDirection="row" alignItems="center" gap="2rem">
        <MyMeetingSectionTitle>모임 목록</MyMeetingSectionTitle>
        <Link to={RouterPath.create}>
          <MakeMeetingBtn>모임 생성하기 &rarr;</MakeMeetingBtn>
        </Link>
      </Container>
      <Spacing height={36} />
      {nonConfirmedMeetings.length > 0 && (
        <>
          <MeetingsTitle>확정 대기중인 모임</MeetingsTitle>
          <hr />
          <MeetingList>
            {nonConfirmedMeetings.map(({ meetingId, title, confirmedDateTime }) => (
              //TODO: slug 추가시 변경
              <Link to={RouterPath.group}>
                <MetingList key={meetingId}>
                  <MeetingTitle>{title}</MeetingTitle>
                  <MetingConfirmDateTime>{confirmedDateTime}</MetingConfirmDateTime>
                </MetingList>
              </Link>
            ))}
          </MeetingList>
        </>
      )}
      <Spacing height={52} />
      {confirmedMeetings.length > 0 && (
        <>
          <MeetingsTitle>확정된 모임</MeetingsTitle>
          <hr />
          <MeetingList>
            {confirmedMeetings.map(
              ({ meetingId, title, confirmedDateTime, confirmedFood: { name: foodName } }) => (
                //TODO: slug 추가시 변경
                <Link to={RouterPath.group}>
                  <MetingList key={meetingId}>
                    <MeetingTitle>{title}</MeetingTitle>
                    <MeetingConfirmFood>{foodName}</MeetingConfirmFood>
                    <MetingConfirmDateTime>{confirmedDateTime}</MetingConfirmDateTime>
                  </MetingList>
                </Link>
              ),
            )}
          </MeetingList>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section``;

const MyMeetingSectionTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 800;
  user-select: none;
`;

//TODO: Link로 변경
const MakeMeetingBtn = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #747474;
  text-decoration: underline;
  user-select: none;
`;

const MeetingsTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 500;
  user-select: none;
`;

const MeetingList = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  user-select: none;
`;

const MetingList = styled.li`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  font-size: 1.2rem;
  font-weight: 600;
  background-color: #fcf8f3;
  padding: 2.2rem;
  border-radius: 14px;
  cursor: pointer;
`;

const MeetingTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
`;

const MeetingConfirmFood = styled.span`
  font-size: 1.1rem;
  font-weight: 400;
`;

const MetingConfirmDateTime = styled.span`
  font-size: 1.1rem;
  font-weight: 400;
  text-align: end;
`;
