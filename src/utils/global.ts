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
    _id : string
    LessionName : string,
    LessionNumber : number,
    vocabularyCount : number
    vocabulary : IVocabulary[]
}

export interface IVocabulary {
    _id : string
    word: string;
    pronunciation: string; 
    whenToSay: string; 
    lessonNo: number; 
    adminEmail: string; 
    userId : string,
    userName : string
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