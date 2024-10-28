import styled from '@emotion/styled';

import { useGetRecommendMenu } from '@/api/hooks/useGetRecommandMenu';
import { Spacing } from '@/components/common/layouts/Spacing';
import { DefaultMenu } from '@/components/common/Menu/DefaultMenu';
import { MenuCategory } from '@/components/common/Menu/MenuCategory';
import { useGetMeetingId } from '@/hooks/useGetMeetingId';
import { colors } from '@/styles/variants';

export const GroupCollectionMenuSection: React.FC = () => {
  const meetingId = useGetMeetingId();

  const { data: foods, status } = useGetRecommendMenu(meetingId);

  if (status === 'pending') return <div>Loading...</div>;
  if (status === 'error') return <div>Error</div>;

  return (
    <section>
      <HeaderTitle>추천 음식</HeaderTitle>
      <Spacing height={20} />
      <MenuCategory foods={foods}>{({ name }) => <DefaultMenu menuName={name} />}</MenuCategory>
    </section>
  );
};

const HeaderTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 800;
  user-select: none;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${colors.gray};
`;
