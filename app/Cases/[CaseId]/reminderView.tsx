"use client"
import React from 'react';
import Link from 'next/link';
import moment from "moment"
import { Reminders } from '@prisma/client';
import { useRemindersContext } from '@/app/store';

const ReminderView=(props: Reminders)=> {
  const {Reminders,SetReminders}=useRemindersContext()
  function  formatDueDate (date: moment.MomentInput) {
    moment.locale("he")
    return moment(date).format('MMMM Do YYYY');
  }

 async function deleteReminder() {
    let data=JSON.stringify({"id":props.id})
    const request =  await fetch("/api/reminders/delete",{body:data,method:"DELETE"})
    if(request.ok){
      SetReminders(Reminders.filter(rem => rem.id !== props.id))
    }
  }

  return (
    <>
 
    <div className="max-w-sm shadow-md bg-gray-300">
         <div className='mb-2'>

<div className="text-center text-lg font-semibold ">
    {props.caseid.toString()}
  </div>
  </div>
      <div className="text-center text-xl text-gray-600 font-semibold mb-2">
        {props.task}
      </div>
      <div className="text-center text-lg font-semibold ">
        {props.summery}
      </div>
      <div className="text-center text-lg font-semibold ">
        due date : {formatDueDate(props.due_date)}
      </div>

    
      <div className="flex gap-3 mt-2">
        <div>
          <button
            className="bg-blue-500 text-white rounded px-2 py-2 hover:bg-blue-400"
            onClick={deleteReminder}
          >
            delete reminder
          </button>
        </div>
        <div>
          <Link
            className="bg-blue-500 text-white rounded px-2 py-2 hover:bg-blue-400"
            href={`Cases/edit/${props.id}`}
          >
            edit reminder
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
export default ReminderView

