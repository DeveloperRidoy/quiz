
import { NextApiRequest } from "next";
import { IUser } from "./state";


// api response 
export interface IApiResponse {
    status: 'success' | 'fail', 
    message: string, 
    data?: Object 
}

// extending NextApiRequest 
export interface ExtendedNextApiRequest extends NextApiRequest {
    user: IUser
}


// auth token types
export enum ETokenType {
    AUTH = 'auth', 
    RECOVER_PASSWORD = 'recover_password'
}


// for authentication types 
export enum EAuthType {
    DEFAULT = 'DEFAULT', 
    GOOGLE = 'GOOGLE'
}

// for token names
export enum ETokenNames {
    AUTH_TOKEN = 'AUTH_TOKEN'
}

// for user roles 
export enum EUserRoles {
    ADMIN = 'ADMIN', 
    USER = 'USER'
}


