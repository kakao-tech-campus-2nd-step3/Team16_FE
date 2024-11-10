import { setupWorker } from 'msw';

import { calendarMockHandler } from '@/api/mock/calendar.mock';
import { LoginMockhandler } from '@/api/mock/login.mock';
import { meetingMockHandler } from '@/api/mock/meeting.mock';
import { userMockhandler } from '@/api/mock/user.mock';

export const worker = setupWorker(
  ...userMockhandler,
  ...LoginMockhandler,
  ...meetingMockHandler,
  ...calendarMockHandler,
);
