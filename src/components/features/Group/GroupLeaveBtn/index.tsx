import { useNavigate } from 'react-router-dom';

import { useLeaveGroup } from '@/api/hooks/useLeaveGroup';
import { Button } from '@/components/common/Button';
import { useGetMeetingId } from '@/hooks/useGetMeetingId';

export const GroupLeavtBtn: React.FC = () => {
  const meetingId = useGetMeetingId();
  const navigate = useNavigate();

  const { mutate: leaveGroup } = useLeaveGroup();

  const onClickHandler = () => {
    leaveGroup(
      { meetingId },
      {
        onSuccess: () => {
          navigate('/');
        },
      },
    );
  };

  return (
    <Button theme="red" onClick={onClickHandler}>
      밥팅 나가기
    </Button>
  );
};
