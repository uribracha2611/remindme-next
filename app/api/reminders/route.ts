
import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { BaseRespone } from "@/app/types"
import  prisma  from '../../prisma'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export  async function GET(req:NextRequest):Promise<NextResponse>{
    try{
        const session=await getServerSession(authOptions)
        if(!session){
            return NextResponse.json({"message":"you are not logged in"} as BaseRespone)
        }
    let data= await  prisma.reminders.findMany({where:{userid:session.user.id}})
    return NextResponse.json({"reminders":data},{status:200})
    }
    catch(err){
console.log(err)
let resp:BaseRespone={"message":"there was an error"}
return NextResponse.json(resp,{status:400})
    }
 
}