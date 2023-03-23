import { Route } from "./types"
 export const routes: Route[] =
 [
    {
    name:"home",
    path:"/",
    LoggedInRequired:false
},
{
    name:"Register",path:"/register",LoggedInRequired:false
},
{name:"add reminder", path:"/AddReminder",LoggedInRequired:true},
{name:"cases", path:"/Cases",LoggedInRequired:true},
{name:"Calender", path:"/Calender", LoggedInRequired:true}
]
