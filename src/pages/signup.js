import { useState } from "react";
import { auth } from "../firebase";
import db from "../firebase";
import { useHistory } from "react-router";

const Signup =()=>{
    const history = useHistory();
 const [data,setdata] = useState({
     name:'',
     email:'',
     password:'',
     error:null,
     loading:false
 });
const {name,email,password,error,loading} = data;

const handlechange=(e)=>{
    setdata({...data,[e.target.name]:e.target.value});
}
const submit = async(e)=>{
    e.preventDefault();
    setdata({...data,error:null,loading:true});
    if(!name || !email || !password)
    setdata({...data,error:"All fields are required!"});
    try
    {
      const result = await auth.createUserWithEmailAndPassword(email,password);
      await db.collection('users').doc(result.user.uid).set({
          uid:result.user.uid,
          name,
          email,
          createdAt: new Date().toLocaleDateString(),
          isOnline:false
      })
      setdata({  
     name:'',
      email:'',
      password:'',
      error:null,
      loading:false
    });
    history.replace("/");
    }catch(err){
        console.log(err);
     setdata({...data,error:err.message});
    }
}
    return <section>
        <h3> Create an Account</h3>
        <form onSubmit={submit}>
          <div className="input_container">
           <label htmlFor="name">Name</label>
           <input type="text" name="name" value={name} onChange={handlechange}/>
          </div>
          <div className="input_container">
           <label htmlFor="email">Email</label>
           <input type="email" name="email" value={email} onChange={handlechange}/>
          </div>
          <div className="input_container">
           <label htmlFor="password">Password</label>
           <input type="password" name="password" value={password} onChange={handlechange}/>
          </div>
          {error?<div style={{textAlign:"center", color:"red"}}>{error}</div>:null}
          <div className="btn_container" disabled={loading}>
              <button className="btn">{loading? "Creating..." : "Signup"}</button>
          </div>
        </form>
    </section>
}

export default Signup;