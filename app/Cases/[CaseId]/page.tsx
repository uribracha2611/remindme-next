"use client"
import { Reminders } from "@prisma/client";
import ReminderView from "./reminderView"

import { useEffect, useMemo, useState } from "react";
import { useRemindersContext } from "@/app/store";
import { useSession } from "next-auth/react";
import { fetchReminders } from "@/app/utils";
export default function RemindersPage({ params}:any) {
  const CaseId=params.CaseId
  const [Loading,SetLoading]=useState(false)
  const session=useSession()
  const {Reminders}=useRemindersContext()
  const FilteredReminders=useMemo(()=>Reminders.filter((rem)=>rem.caseid==Number.parseInt(CaseId as string)),[Reminders])


  useEffect(()=>{
   
 
      
      if (session && session!=undefined && session.status=="authenticated" && Reminders.length==0) {
        SetLoading(true)
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