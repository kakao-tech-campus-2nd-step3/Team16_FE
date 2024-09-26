import { setupWorker } from 'msw';

import { userMockhandler } from '@/api/mock/user.mock';

export const worker = setupWorker(...userMockhandler);
