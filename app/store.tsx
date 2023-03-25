"use client"
import { Reminders } from "@prisma/client";
import { createContext, useContext, useState } from "react";

interface RemindersContextState {
  Reminders: Reminders[];
  IsLoaded:Boolean
  SetReminders: (Reminders: Reminders[]) => void,
  SetIsLoaded:(IsLoaded:boolean)=>void
};

export const RemindersContext = createContext<RemindersContextState>({
  Reminders: [],
  IsLoaded:false,
  SetReminders: () => {},
  SetIsLoaded:()=>{}
});

export default function AppStore({ children }:any) {
  const [Rem, setRem] = useState<Reminders[]>([]);
  const [IsLoaded, SetLoaded] = useState<Boolean>(false);
  function setReminders(reminders: Reminders[]) {
    setRem(reminders);
  }
  function SetIsLoaded(Loaded: Boolean  ) {
    SetLoaded(Loaded)
  }

  return (
    <RemindersContext.Provider value={{ Reminders: Rem, SetReminders: setReminders,IsLoaded,SetIsLoaded }}>
      {children}
    </RemindersContext.Provider>
  );
}

export function useRemindersContext() {
  return useContext(RemindersContext);
}