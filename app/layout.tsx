'use client';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import AuthContext from "./AuthContext";
import BackButton from "./backButton";
import Footer from "./footer";
import NavBar from './navbar'
import AppStore, { useRemindersContext } from "./store";
import { fetchReminders } from "./utils";
import './globals.css'
export interface AccountLayoutProps {
  children: React.ReactNode;
}



const session=useSession()
const {Reminders,SetReminders}=useRemindersContext()

useEffect(()=>{
   
 
      
  if (session && session!=undefined && session.status=="authenticated" && Reminders.length==0) {
    fetchReminders()
  };

},
[session])
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
<body >
  <AuthContext>
  <AppStore>
  <NavBar />
    <BackButton/>

    
    <main>{children}</main>
    </AppStore>
    </AuthContext>



    </body>
    
    </html>
    
  )
}
