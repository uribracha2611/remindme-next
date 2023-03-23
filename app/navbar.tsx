"use client"
import Link from "next/link"
import {routes} from "./routes"
import {signIn, signOut, useSession} from "next-auth/react"
import { Season } from "./types"
function LoginButton(){
    return <div className="text-white font-semibold hover:text-red-500">
        <button onClick={()=> signIn()}> login</button>
    </div>
}
function LogoutButton(){
    return <div className="text-white font-semibold hover:text-red-500">
        <button onClick={()=> signOut({callbackUrl:`${window.location.origin}/`})}> logout</button>
    </div>
}
function ShowUser(){
    let { data: session }=useSession() as Season
    return <div className="text-white font-semibold">
        welcome {session?.user?.username}
    </div>
}
function NavBar(){

    let { data: session }=useSession() as Season
    
    let routeList=routes.map((route,index)=> {
        if(route.LoggedInRequired){
            if(session?.user)
        return(
            <div className="font-semibold text-white hover:text-red-500" key={index}>
                
                <Link href={route.path} > {route.name} </Link>
                
            </div>
            
        )    
        }
        else{
            return(
                <div className="font-semibold text-white hover:text-red-500" key={index}>
                    
                    <Link href={route.path} > {route.name} </Link>
                    
                </div>
            ) 
        }
})

return(
    <nav className="flex  w-full p-3 bg-gray-800  justify-between">
        <div>
            <div >
                <div className="text-xl font-bold text-gray-300 "> Remindme</div>
            </div>
        </div>
        <div className="flex gap-3">
            {session?.user && 
            <ShowUser/>  
            }
              {session?.user && 
            <LogoutButton/>  
            }
             {!session && 
            <LoginButton/>  
            }
           
           {routeList} 
          
        </div>
        
    </nav>
)
}


export default NavBar