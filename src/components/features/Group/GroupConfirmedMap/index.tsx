import { useGetConfirmInfo } from '@/api/hooks/Meeting/useGetConfirmInfo';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useGetMeetingId } from '@/hooks/useGetMeetingId';
import { SearchMap } from '@/service/KakaoMap/components/SearchMap';

export const GroupConfirmedMap: React.FC = () => {
  const meetingId = useGetMeetingId();
  const { data, status } = useGetConfirmInfo({ meetingId });

  if (status === 'pending') {
    return <div>Loading..</div>;
  }

  if (status === 'error') {
    return <div>error</div>;
  }

  if (!data.baseLocation || !data.confirmedFood) return null;

  const {
    baseLocation: { latitude, longitude },
    confirmedFood: { name },
  } = data;

  return (
    <section>
      <SearchMap
        keyword={name}
        baseLocation={{
          lat: latitude,
          lng: longitude,
        }}
      />
      <Spacing height={80} />
    </section>
  );
};
