import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useGetMeetingInfo } from '@/api/hooks/useGetMeetingInfo';
import { Container } from '@/components/common/layouts/Container';
import { JoinBtn } from '@/components/features/Join/JoinBtn';
import { JoinCalendar } from '@/components/features/Join/JoinCalendar';
import { JoinFood } from '@/components/features/Join/JoinFood';
import { JoinTitle } from '@/components/features/Join/JoinTitle';
import { useJoinFormContext } from '@/hooks/useJoinFormContext';
import type { SelectedTime } from '@/types';

export const JoinPage: React.FC = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const { data: meetingInfo, isLoading } = useGetMeetingInfo(meetingId || '');
  const methods = useJoinFormContext();

  const [times, setTimes] = useState<SelectedTime[]>([]);

  if (isLoading || !meetingInfo) {
    return <div>Loading...</div>;
  }

  const { title, startDate, endDate, startTime, endTime } = meetingInfo;

  const handleTimesUpdate = (newTimes: SelectedTime[]) => {
    setTimes(newTimes);
  };

  return (
    <Container gap="40px">
      <JoinTitle title={title} />
      <FormProvider {...methods}>
        <JoinCalendar
          startDate={startDate}
          endDate={endDate}
          startTime={startTime}
          endTime={endTime}
          onTimesUpdate={handleTimesUpdate}
        />
        <JoinFood />
        <JoinBtn times={times} />
      </FormProvider>
    </Container>
  );
};
