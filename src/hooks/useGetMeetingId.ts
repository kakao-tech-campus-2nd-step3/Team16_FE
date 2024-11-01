import { useParams } from 'react-router-dom';

export const useGetMeetingId = () => useParams<{ meetingId: string }>().meetingId || '';
