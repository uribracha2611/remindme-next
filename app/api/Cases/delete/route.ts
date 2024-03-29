import { Reminders } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { BaseRespone } from "@/app/types";
import prisma from "../../../prisma"
export  async function DELETE(req:NextRequest,res:any){
    const session=await getServerSession(authOptions)
    if(!session){
        return NextResponse.json({"message":"you are not logged in"} as BaseRespone,{status:400})
    }
    const ReqData=await req.json()  
    const CaseId=ReqData.CaseId as number
    let reminder=await prisma.reminders.deleteMany({
        where:
    {
         caseid:CaseId
    }
    })

return NextResponse.json({"message":"delete successful"})
}