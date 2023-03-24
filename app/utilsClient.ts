import { useRemindersContext } from "./store";
const {SetReminders}=useRemindersContext()
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