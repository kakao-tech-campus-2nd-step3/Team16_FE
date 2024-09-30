import { setupWorker } from 'msw';

import { calendarMockHandler } from '@/api/mock/calendar.mock';
import { userMockhandler } from '@/api/mock/user.mock';

export const worker = setupWorker(...userMockhandler, ...calendarMockHandler);
