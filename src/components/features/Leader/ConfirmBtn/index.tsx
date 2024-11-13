import { useFormContext } from 'react-hook-form';

import { useConfirm } from '@/api/hooks/Meeting/useConfirm';
import { useGetConfirmInfo } from '@/api/hooks/Meeting/useGetConfirmInfo';
import { Button } from '@/components/common/Button';
import { useGetMeetingId } from '@/hooks/useGetMeetingId';

export const ConfirmBtn: React.FC = () => {
  const meetingId = useGetMeetingId();
  const { watch } = useFormContext();
  const { confirmDateTime, confirmFoodId } = watch();

  const { refetch, data } = useGetConfirmInfo({ meetingId });
  const { mutate } = useConfirm();

  const onClick = () => {
    if (!confirmDateTime) {
      alert('날짜를 선택해주세요.');
      return;
    }
    if (!confirmFoodId) {
      alert('음식을 선택해주세요.');
      return;
    }

    mutate(
      { meetingId, confirmRequest: { confirmDateTime, confirmFoodId } },
      {
        onSuccess: () => {
          alert('확정이 완료되었습니다.');
          refetch();
        },
        onError: () => alert('확정에 실패했습니다.'),
      },
    );
  };

  return (
    <Button theme="green" onClick={onClick} disabled={Boolean(data)}>
      확정하기
    </Button>
  );
};
