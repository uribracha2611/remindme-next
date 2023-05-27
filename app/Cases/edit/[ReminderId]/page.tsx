"use client"
import { useRemindersContext } from "@/app/store";
import { Reminders } from "@prisma/client";
import { FormEvent, useMemo, useState } from "react";
import Link from "next/link"
export default function EditPage({ params}:any) {
    const Id:number=params.ReminderId
    const {Reminders,SetReminders}=useRemindersContext()
    const FilteredReminders=useMemo(()=>Reminders.find(rem=>rem.id==Id) as Reminders,[Reminders])
  
    

    const [task, setTask] = useState(FilteredReminders.task);
    const [caseid, setCaseId] = useState(FilteredReminders.caseid);
    const [summery, setSummery] = useState(FilteredReminders.summery);
    const [dueDate, setDueDate] = useState(FilteredReminders.task);
    const [status, setStatus] = useState("");
  
    function updateReminder(reminderToUpdate:Reminders) {
      // create a new array of reminders with the updated reminder
      const updatedReminders = Reminders.map((reminder) => {
        if (reminder.id === reminderToUpdate.id) {
          return {
            ...reminder,
            ...reminderToUpdate,
          };
        } else {
          return reminder;
        }
      });
    
      // update the reminders state with the new array of reminders
      SetReminders(updatedReminders);
    }

    const handleSubmit = async (event:FormEvent) => {
      event.preventDefault();
      let RemToSend= {caseid:caseid,summery:summery, due_date: new Date(dueDate).toISOString(), id:FilteredReminders.id,task:task,userid:FilteredReminders.userid}
      
      // Add code to handle form submission
      let request= await fetch("http://localhost:3000/api/edit",{body: JSON.stringify({"reminder":RemToSend}),method:"POST" })
      if(request.status!=400){
        let reminder= await request.json() as {"message":string,"reminder":Reminders}
        setStatus(reminder.message)
        updateReminder(reminder.reminder)
        
      }
    };
  
    return (
      <div className="mt-5">
<div>
</div>
        <div className="bg-gray-300 rounded overflow-hidden shadow-lg w-1/2 mx-auto p-3">
          <div className="mx-3 ">
            <div className="text-2xl text-center text-gray-700 font-semibold">
              Edit Reminder
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
                  htmlFor="reminder"
                >
                  reminder
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="reminder"
                  type="text"
                  placeholder="reminder"
                  value={task}
                  onChange={(event) => setTask(event.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="case_id"
                >
                  case id
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="case_id"
                  type="text"
                  value={caseid}
                  onChange={(event) => setCaseId(Number.parseInt( event.target.value))}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="summary"
                >
                  summary
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="summary"
                  type="text"
                  value={summery}
                  onChange={(event) => setSummery(event.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="due_date"
                >
                  due date
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
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2"/>
                  </div>
                  </form>
                  </div>
                  </div>
                  </div>
  

)
    }