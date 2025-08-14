export interface IUserLoggedIn {
    email: string;
    id: string;
    role: string;
}

export interface User {
    _id: string;
    email: string;
    name: string;
    phone: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    resetPasswordExpires?: Date;
    resetPasswordToken?: string;
}