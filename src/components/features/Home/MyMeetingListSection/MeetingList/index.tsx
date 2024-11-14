import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import type { Meeting } from '@/api/hooks/Meeting/useGetMyMeetings';
import { RouterPath } from '@/routes/path';

type Props = {
  meetings: Meeting[];
  showFoodName?: boolean;
};

export const MeetingList: React.FC<Props> = ({ meetings, showFoodName = false }) => {
  return (
    <>
      {meetings.map(({ confirmedDateTime, confirmedFood, meetingId, title: meetingTitle }) => (
        <Link to={`${RouterPath.group}/${meetingId}`} key={meetingId}>
          <MeetingItem>
            <MeetingTitle>{meetingTitle}</MeetingTitle>
            {showFoodName && confirmedFood && (
              <MeetingConfirmFood>{confirmedFood.name}</MeetingConfirmFood>
            )}
            <MeetingConfirmDateTime>
              {confirmedDateTime &&
                new Date(confirmedDateTime).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
            </MeetingConfirmDateTime>
          </MeetingItem>
        </Link>
      ))}
    </>
  );
};

const MeetingItem = styled.li`
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

const MeetingConfirmDateTime = styled.span`
  font-size: 1.1rem;
  font-weight: 400;
  text-align: end;
`;
