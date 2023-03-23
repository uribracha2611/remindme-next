"use client"
import { Reminders } from "@prisma/client";
import ReminderView from "./reminderView"

import { useEffect, useMemo } from "react";
import { useRemindersContext } from "@/app/store";
import { useSession } from "next-auth/react";
export default function RemindersPage({ params}:any) {
  const CaseId=params.CaseId
  const session=useSession()
  const {Reminders,SetReminders}=useRemindersContext()
  const FilteredReminders=useMemo(()=>Reminders.filter((rem)=>rem.caseid==Number.parseInt(CaseId as string)),[Reminders])


  useEffect(()=>{
   
      async function fetchReminders() {
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
      
      if (session && session!=undefined && session.status=="authenticated" && Reminders.length==0) {
        fetchReminders()
      };
  
    },
  [session])
    return (
      <div className="mt-4">
        <div className="bg-gray-300 rounded overflow-hidden shadow-lg w-1/2 mx-auto p-3 mb-4">
          <div className="mx-3">
            <div className="text-2xl text-center text-gray-700 font-semibold">
              Cases
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mx-3">
          {FilteredReminders.map((reminder) => (
            <ReminderView
              key={reminder.id.toString()}
              id={reminder.id}
              caseid={reminder.caseid}
              userid={reminder.userid}
              due_date={reminder.due_date}
              task={reminder.task}
              summery={reminder.summery}
            />
          ))}
        </div>
      </div>
    );
  }