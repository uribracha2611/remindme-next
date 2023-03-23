
import { BaseRespone, Season, User } from "@/app/types"
import { getSession } from "next-auth/react"
import { NextResponse } from "next/server"
import {Reminders} from "@prisma/client"
import  prisma  from '../../prisma'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export  async function POST(req:any, res:any){
    try{

      const session=await getServerSession(authOptions)
    if(!session){
        return NextResponse.json({"message":"you are not logged in"} as BaseRespone)
    }

            const ReqData=await req.json() as Reminders
           const  result= await prisma.reminders.create({data:ReqData})
           if(result){
         return   NextResponse.json({"message":"Reminder added","reminder":result},{status:200})
           }
           else{
            return   NextResponse.json({"message":"there was an error"},{status:400})
           }
            
        }
   

catch(err){
    console.log(err)
    return   NextResponse.json({"message":"there was an error"},{status:400})
}
}