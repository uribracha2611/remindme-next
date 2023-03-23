import {  Reminders } from "@prisma/client"
import {sign,verify} from "jsonwebtoken"


import {RemindersState} from './store';
import { Case } from "./types";
import  prisma  from './prisma'

export async function  DoesUsernameExist(username:string){
    try{
let user=await prisma.users.findFirst({
    where:{
        username:username
    }
    
})
return user
}
catch(err){
    console.log("user err is "+ err)
    return null
}
}

export function CreateAcsessToken(id:number,AcsessToken:string){
    return sign(id.toString(),AcsessToken)
}

export function filterRemindersByDate(arr: Reminders[], date:Date) {
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, -1);
    return arr.filter(Reminder => Reminder.due_date  >= startOfDay && Reminder.due_date  <= endOfDay);
  }

export function filterRemindersByCase(arr:Reminders[],CaseId:Number){
    return arr.filter(Reminder => Reminder.caseid==CaseId )
}

export function getCases(reminders: Reminders[]): Case[] {
  try{
    const cases: Map<number, Case> = new Map();
    for (const reminder of reminders) {
      let caseObj = cases.get(reminder.caseid);
  
      if (!caseObj) {
  
        caseObj = {
          CaseId: reminder.caseid,
          UserId: reminder.userid,
          Reminders: [reminder],
        };
        cases.set(reminder.caseid, caseObj);
      } else {
        caseObj.Reminders.push(reminder);
  
        
        if (caseObj.UserId !== reminder.userid) {
          caseObj.UserId = undefined;
        }
      }
    }

    return Array.from(cases.values());
  }
  catch(e){
    console.log(e)
    return []
  }
}