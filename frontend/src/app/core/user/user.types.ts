export interface User
{
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    enabled: boolean;
    lastPasswordResetDate: string;
    avatar?: string;
    initialPassword: boolean;
    authorities: [];
}
