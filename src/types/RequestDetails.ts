import { User } from './User';

export interface RequestDetails {
    body: unknown;
    endpoint: string;
    method: string;
    ip: string;
    user: null | User;
}
