"use client"
import { useSession } from "next-auth/react";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import ReminderView from "../Cases/[CaseId]/reminderView";
import { useRemindersContext } from "../store";
import LoadingScreen from "../LoadingScreen" 
export default function Calender(){
    
    const [due_date, setDueDate] = useState(new Date().toISOString().split('T')[0]);
    const {Reminders,SetReminders,IsLoaded,SetIsLoaded}=useRemindersContext()
    const session=useSession()
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
          SetIsLoaded(true)
        } catch (error) {
          console.error(error);
        }
      }
      if (session && session!=undefined && session.status=="authenticated" && Reminders.length==0 && !IsLoaded) {
        fetchReminders()
        
      };
  
    },
  [session])

    const filteredReminders = useMemo( ()=>{
      const dateObj=new Date( due_date)
      dateObj.setUTCHours(0,0,0,0)
      let DateToCheck=dateObj.toISOString()
      console.log(DateToCheck)
      console.log("Reminders are " +JSON.stringify(Reminders))
        return Reminders.filter(
        (reminder) => {
           
          return  reminder.due_date as unknown as string === DateToCheck
        })
    
    },[due_date,Reminders]);
    
      const handleFilterChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setDueDate(e.target.value);
      };
    
    return (
        <div>
          <div className="mt-2">
            <div className="bg-gray-300 rounded overflow-hidden shadow-lg w-1/2 mx-auto p-3">
              <div className="mx-3">
                <div className="text-2xl text-center text-gray-700 font-semibold">
                  Calender
                </div>
              </div>
            </div>
          </div>
          <div className="text-2xl text-center font-semibold">choose a date</div>
          <div className="mx-auto max-w-sm">
            <form className="max-w-sm">
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="summery"
                >
                  due_date
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="summery"
                  type="date"
                  value={due_date}
                  onChange={handleFilterChange}
                />
              </div>
            </form>
          </div>
        
          <div className="grid grid-cols-3 gap-3 mx-3">
            {filteredReminders.map((Reminder) => (
              <ReminderView
                    key={Reminder.id.toString()}
                    id={Reminder.id}
                    caseid={Reminder.caseid}
                    due_date={Reminder.due_date}
                    task={Reminder.task}
                    summery={Reminder.summery} userid={Reminder.userid}              />
            ))}
          </div>
        </div>
      );
    }

