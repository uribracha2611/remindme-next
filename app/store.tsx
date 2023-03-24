import { Reminders } from "@prisma/client";
import { createContext, useContext } from "react";

interface RemindersContextState {
  reminders: Reminders[] | null;
  SetReminders: (reminders: Reminders[]) => void;
}

export const RemindersContext = createContext<RemindersContextState>({
  reminders: null,
  SetReminders: () => {},
});

export const RemindersContextProvider = ({ children }:any) => {
  const contextState: RemindersContextState = {
    reminders: null,
    SetReminders: (reminders: Reminders[]) => {
      contextState.reminders = reminders;
    },
  };

  return (
    <RemindersContext.Provider value={contextState}>
      {children}
    </RemindersContext.Provider>
  );
};

export const useRemindersContext = () => useContext(RemindersContext);
