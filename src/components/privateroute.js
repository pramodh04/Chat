import { auth } from "../firebase";
import {  Redirect } from "react-router";
import { Route } from "react-router-dom";
import { useEffect, useState } from "react";


  const PrivateRoute=(props)=>{
      const [currentuser,setuser]= useState(null);
      const [load,setload] = useState(false);
    const {component:Component, ...rest} = props;
      const user =auth.currentUser;
      useEffect(()=>{
       auth.onAuthStateChanged((user)=>
       {
           setuser(user);
           setload(true);
       })
      },[currentuser]);
      return <>{
          load?<Route {...rest} exact render={(props)=>user?<Component {...props}/>:<Redirect to="/login"/>}/>:<div>Loading</div>
      }
      </>
    }
export default PrivateRoute;  