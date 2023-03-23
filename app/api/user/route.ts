

import {User} from "../../types"
import {DoesUsernameExist} from "../../utils"
import  prisma  from '../../prisma'
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
export  async function POST(req:Request){
    try{
        let {username,password}=await req.json() as User
        let user=await DoesUsernameExist(username)
        if(!user){
           
            const hashedPassword = await hash(password, 12);
           await prisma.users.create({data:{username:username,password:hashedPassword}})
           
            return   NextResponse.json({ "message": "User registered successfully" },{status: 200})
        }
        else{
            return NextResponse.json({"message":"User exists already"})
        }
    }
 


catch(err){
    console.log(err)
    return {"message":"There was an error"}

}
}