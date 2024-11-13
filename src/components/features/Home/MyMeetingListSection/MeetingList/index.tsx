import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import type { Meeting } from '@/api/hooks/Meeting/useGetMyMeetings';
import { RouterPath } from '@/routes/path';

type Props = {
  meetings: Meeting[];
  title: string;
  showFoodName?: boolean;
};

export const MeetingList: React.FC<Props> = ({ meetings, title, showFoodName = false }) => {
  return (
    <>
      <MeetingsTitle>{title}</MeetingsTitle>
      <hr />
      {meetings.map(({ confirmedDateTime, confirmedFood, meetingId, title: meetingTitle }) => (
        <Link to={`${RouterPath.group}/${meetingId}`} key={meetingId}>
          <MeetingItem>
            <MeetingTitle>{meetingTitle}</MeetingTitle>
            {showFoodName && confirmedFood && (
              <MeetingConfirmFood>{confirmedFood.name}</MeetingConfirmFood>
            )}
            <MeetingConfirmDateTime>{confirmedDateTime}</MeetingConfirmDateTime>
          </MeetingItem>
        </Link>
      ))}
    </>
  );
};

const MeetingsTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 500;
  user-select: none;
`;

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
