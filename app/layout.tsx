'use client';
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import AuthContext from "./AuthContext";
import BackButton from "./backButton";
import Footer from "./footer";
export interface AccountLayoutProps {
  children: React.ReactNode;
}

import './globals.css'
import NavBar from './navbar'
import AppStore from "./store";




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
  <Footer/>


    </body>
    
    </html>
    
  )
}
