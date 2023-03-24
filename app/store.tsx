"use client"
import { Reminders } from "@prisma/client";
import { createContext, useContext, useState } from "react";

interface RemindersContextState {
  Reminders: Reminders[];
  SetReminders: (Reminders: Reminders[]) => void;
};

export const RemindersContext = createContext<RemindersContextState>({
  Reminders: [],
  SetReminders: () => {},
});

export default function AppStore({ children }:any) {
  const [Rem, setRem] = useState<Reminders[]>([]);

  function setReminders(reminders: Reminders[]) {
    setRem(reminders);
  }

  return (
    <RemindersContext.Provider value={{ Reminders: Rem, SetReminders: setReminders }}>
      {children}
    </RemindersContext.Provider>
  );
}

export function useRemindersContext() {
  return useContext(RemindersContext);
}