import { Container } from '@/components/common/layouts/Container';
import { JoinBtn } from '@/components/features/Join/JoinBtn';
import { JoinCalendar } from '@/components/features/Join/JoinCalendar';
import { JoinFood } from '@/components/features/Join/JoinFood';
import { JoinTitle } from '@/components/features/Join/JoinTitle';

export const JoinPage = () => {
  return (
    <Container gap="40px">
      <JoinTitle />
      <JoinCalendar />
      <JoinFood />
      <JoinBtn />
    </Container>
  );
};
