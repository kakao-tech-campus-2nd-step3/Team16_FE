import { useGetConfirmInfo } from '@/api/hooks/Meeting/useGetConfirmInfo';
import { useGetMeetingId } from '@/hooks/useGetMeetingId';
import { KakaoMapSearch } from '@/service/KakaoMap';

export const GroupConfirmedMap: React.FC = () => {
  const meetingId = useGetMeetingId();

  const { data, status } = useGetConfirmInfo({ meetingId });

  if (status === 'pending') {
    return <div>Loading..</div>;
  }

  if (status === 'error') {
    return <div>error</div>;
  }

  if (!data) return null;

  const {
    baseLocation: { latitude, longitude },
    confirmedFood: { name },
  } = data;

  return (
    <section>
      <KakaoMapSearch
        keyword={name}
        baseLocation={{
          lat: latitude,
          lng: longitude,
        }}
      />
    </section>
  );
};
