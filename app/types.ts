import {Reminders} from "@prisma/client"

export interface BaseRespone{
    message:string
}

export interface Case
{
    CaseId: number,
    UserId?:number
    Reminders:Reminders[]
}
export interface User{
    id?:number
    username:string,
    password:string
}
export interface Route
{
    name:string,
    path:string,
    LoggedInRequired:boolean
}
export interface Season{
    data: {user:User | null | undefined} | null | undefined,
    status:string
}