/* eslint-disable @typescript-eslint/no-unused-vars */

import { User } from '../User';
import { RequestDetails } from '../RequestDetails';

declare global {
    namespace Express {
        interface Request {
            user: User;
            requestDetails: RequestDetails;
        }
    }
}
