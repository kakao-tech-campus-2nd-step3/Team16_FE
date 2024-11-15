import { useNavigate } from 'react-router-dom';

import { useLeaveGroup } from '@/api/hooks/Meeting/useLeaveGroup';
import { Button } from '@/components/common/Button';
import { useGetMeetingId } from '@/hooks/useGetMeetingId';
import { RouterPath } from '@/routes/path';

export const GroupLeaveBtn: React.FC = () => {
  const meetingId = useGetMeetingId();
  const navigate = useNavigate();

  const { mutate: leaveGroup } = useLeaveGroup();

  const onClickHandler = () => {
    const confirm = window.confirm(
      '밥팅을 나가시겠습니까? \n나가시면 작성하신 모든 정보가 삭제됩니다.',
    );

    if (!confirm) {
      return;
    }

    leaveGroup(
      { meetingId },
      {
        onSuccess: () => {
          navigate(RouterPath.home);
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
