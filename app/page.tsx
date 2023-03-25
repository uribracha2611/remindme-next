"use client"
import HomeCard from '@/compoments/HomeCard'
import { useSession } from 'next-auth/react';
import { useRemindersContext } from './store'


export default function Home() {
  const {Reminders,SetReminders}=useRemindersContext()
  const session=useSession()
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
  return (
    <>
     <div className="mt-24 flex flex-col  w-3/4 mx-auto " style={{gap: "2.25rem"}}>
    
      <div className=" rounded overflow-hidden  w-1/2 mx-auto">
        <div className="mx-3">
          <div className="text-2xl text-center text-gray-700 font-semibold">
            remindMe
          </div>
          <div className="text-xl text-center">
          remindMe is an app for managing your reminders.
          </div>

          </div>
        </div>
        </div>
    

      <div className="grid grid-cols-3 " style={{gap: "2.25rem"}}>
        <div style={{gridColumn: "span 3 / span 3"}}>
        <div className="text-2xl text-center font-semibold text-gray-600">
          what can you expect from Remindme?
          </div>
        </div>
        <div>
          <HomeCard
            icon="plus"
            title="add Reminders"
            Button="go to add reminders"
            description="adding a new reminder requires a case number, title, description and date"
          />
        </div>
        <div>
          <HomeCard
            icon="briefcase"
            title="Cases"
            Button="See cases"
            description="reminders can be organized by cases, click on the button to see how"
          />
        </div>
        <div>
          <HomeCard
            icon="plus"
            title="calender"
            Button="go to calender"
            description="filter reminder by date, click on the button to see how"
          />
        </div>
      </div>

    </>
  )
}
