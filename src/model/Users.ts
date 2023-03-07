export interface inputDTO{
    name: string;
    email: string;
    password: string;
}

export interface User{
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface loginDTO{
    email: string;
    password: string;
}

export type AuthenticationData = {
    id: string;
}