import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Spacing } from '@/components/common/layouts/Spacing';
import { colors } from '@/styles/variants';
import type { GroupEvent } from '@/types';
import { convertToLocaleString } from '@/utils/converter';

type Props = {
  selectedEvents?: GroupEvent;
};

export const GroupSelectedTime: React.FC<Props> = ({ selectedEvents }) => {
  const { setValue } = useFormContext();

  const timeText = '선택된 시작 시간 : ';
  const selectedTime = selectedEvents
    ? convertToLocaleString(selectedEvents.start)
    : '모임 시작 시간을 선택해주세요!';

  useEffect(() => {
    setValue('startAt', selectedEvents?.start);
    setValue('endAt', selectedEvents?.end);
  }, [selectedEvents, setValue]);

  return (
    <>
      <Spacing height={22} />
      <SelectedTimeText>
        {timeText}
        <SelectedTime> {selectedTime}</SelectedTime>
      </SelectedTimeText>
    </>
  );
};

const SelectedTimeText = styled.p`
  font-weight: 700;
  margin-bottom: 20px;
  text-align: end;
`;

const SelectedTime = styled.span`
  color: ${colors.third};
`;
