"use client"
import { useSession } from "next-auth/react";
import React, { FormEvent, useState } from "react";
import { BaseRespone } from "../types";
import { redirect } from 'next/navigation';
import { useRemindersContext } from "../store";
import { Reminders } from "@prisma/client";

export default function ReminderForm() {
    const { data: session, status:sessionStatus } = useSession()
    const {Reminders,SetReminders}=useRemindersContext()
  const [task, settask] = useState("");
  const [caseId, setCaseId] = useState("");
  const [summary, setSummary] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const dueDateObj = new Date(dueDate);
    dueDateObj.setUTCHours(0,0,0,0)
    console.log("add date "+  dueDateObj)
    let request_data={"task": task, caseid: parseInt(caseId) ,"summery": summary,"due_date": dueDateObj,userid:session?.user?.id} as Reminders
  
    let result: BaseRespone=await (await fetch("/api/add",{method:"POST",body:JSON.stringify(request_data)})).json()
    setStatus(result.message)
    SetReminders([...Reminders,request_data])
  
    
  };

  if (sessionStatus=="loading"){
    return <p>loading ...</p>
  }
  else if(sessionStatus=="unauthenticated"){
    return redirect("api/auth/signin")
  }
  else{
  return (
    <div className="mt-5">
      <div className="bg-gray-300 rounded overflow-hidden shadow-lg w-1/2 mx-auto p-3">
        <div className="mx-3">
          <div className="text-2xl text-center text-gray-700 font-semibold">
            Add Reminder
          </div>
        </div>
      </div>
      <div className="flex w-full mt-3">
        <div className="mx-auto max-w-xs">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="task"
              >
                Task
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="reminder"
                type="text"
                placeholder="Reminder"
                value={task}
                onChange={(event) => settask(event.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="case_id"
              >
                Case ID
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="case_id"
                type="text"
                value={caseId}
                onChange={(event) => setCaseId(event.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="summary"
              >
                Summary
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="summary"
                type="text"
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="due_date"
              >
                Due Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="due_date"
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <input
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"/>
                </div>
                </form>
                {
                    status!="" &&
                <div>
                    {status}
                </div>
                }
                </div>
                </div>
                </div>
  )
}
}