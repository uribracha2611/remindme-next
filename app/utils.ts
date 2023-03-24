import {  Reminders } from "@prisma/client"
import {sign,verify} from "jsonwebtoken"



import { Case } from "./types";
import  prisma  from './prisma'
import { useRemindersContext } from "./store";
const {SetReminders}=useRemindersContext()
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
    return arr.filter(Reminder => {
      if(Reminder.due_date){
      Reminder.due_date  >= startOfDay && Reminder.due_date  <= endOfDay
      }
    });
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
export async function fetchReminders() {
  try {
    const response = await fetch("/api/reminders");
    if (!response.ok) {
      throw new Error("Failed to fetch reminders");
    }
    const data = await response.json();
    console.log(data)
    SetReminders(data.reminders);
  } catch (error) {
    console.error(error);
  }
}