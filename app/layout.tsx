"use client"
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import AuthContext from "./AuthContext";
import BackButton from "./backButton";
import NavBar from './navbar'
import AppStore  from "./store";
import './globals.css'

export interface AccountLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body>
        <AuthContext>
          <AppStore>
            <NavBar />
            <BackButton />
            <main>{children}</main>
          </AppStore>
        </AuthContext>
      </body>
    </html>
  );
}
