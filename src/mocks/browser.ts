import { setupWorker } from 'msw';

import { meetingMockhandler } from '@/api/mock/meeting.mock';
import { userMockhandler } from '@/api/mock/user.mock';

export const worker = setupWorker(...userMockhandler, ...meetingMockhandler);
