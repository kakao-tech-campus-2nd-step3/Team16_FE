import { useGetMeetingId } from '@/hooks/useGetMeetingId';

const copyToClipboard = (textToCopy: string) => navigator.clipboard.writeText(textToCopy);

export const GroupLinkBtn: React.FC = () => {
  const meetingId = useGetMeetingId();

  const textToCopy = `${window.location.origin}/join/${meetingId}`;

  const handleOnClick = () =>
    copyToClipboard(textToCopy).then(() => alert('링크가 복사되었습니다.'));

  return <img src="/icons/LinkIcon.svg" alt="group" onClick={handleOnClick} />;
};
