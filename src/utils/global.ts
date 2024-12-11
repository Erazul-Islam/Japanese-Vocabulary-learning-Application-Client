import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
    data: {
        message: string;
        stack: string;
        success: boolean;
    };
    status: number;
};



export type TResponse<T> = {
    data?: T;
    error?: TError;
    success: boolean;
    message: string;
};
export type TLession = {
    LessionName : string,
    LessionNumber : number,
    description : string
}

export interface TUser {
    _id: string;
    name: string,
    email: string,
    password: string,
    photo : string
    createdAt: Date,
    updatedAt: Date,
    role: 'ADMIN' | 'USER'
};
  

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;