import { useState,useEffect } from "react";
import { NavLink,useHistory } from "react-router-dom"
import { auth } from "../firebase";
import db from "../firebase";

const Navbar = (props) =>{
  const [currentuser,setcurrentuser] = useState(null);
  const history = useHistory();
  const handlelogout=async()=>{
    await db.collection('users').doc(auth.currentUser.uid).update({
      isOnline:false
  })
  await auth.signOut();
  setcurrentuser(null);
  history.replace("/login");
  }
  
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>
    setcurrentuser(user));
    // console.log(currentuser);
  },[currentuser])

    return <nav>
      <h1>
      <NavLink id='logo' to="/">ChatApp</NavLink>
      </h1>
      {currentuser? <div>
      <NavLink activeClassName="active" to="/profile">Profile</NavLink>
      <NavLink to="/login"  >
        <button className="btn" onClick={handlelogout}>Logout</button>
      </NavLink>
      </div>:
      <div>
          <NavLink to="/login" activeClassName='active'>Login</NavLink>
          <NavLink to="/signup" activeClassName='active' >signup</NavLink>
      </div>}
     
    </nav>
}
export default Navbar;