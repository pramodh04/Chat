import { HashRouter, Switch ,Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Signup from './pages/signup';
import Login from './pages/Login';
import Profile from './pages/profile';
import Error from './pages/error';
import { auth } from "./firebase";
import {  Redirect } from "react-router";
import { useEffect, useState } from "react";
// import PrivateRoute from './components/privateroute';

function App() {
  const [currentuser,setuser]= useState(null);
  const [load,setload] = useState(false);
  const user =auth.currentUser;
  const PrivateRoute=(props)=>{
  const {component:Component, ...rest} = props;
    return <>{
        load?<Route {...rest} exact render={(props)=>user?<Component {...props}/>:<Redirect to="/login"/>}/>:<div>Loading</div>
    }
    </>
  }
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>
    {
        setuser(user);
        setload(true);
    })
   },[currentuser]);
  return (
   <HashRouter>
   <Navbar/>
   <Switch>
   <Route exact path="/signup" component={Signup}/>
   <Route exact path="/login" component={Login}/>
   <Route exact path="/profile" component={Profile}/>
   <PrivateRoute exact path="/React-firebase-chatapp" component={Home}/>
   <PrivateRoute exact path="/" component={Home}/>
   <Route component={Error}/>
   </Switch>
  </HashRouter> 
  );
}

export default App;
