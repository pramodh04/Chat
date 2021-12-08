import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import db from "../firebase";
import Img from "../avatar.png"


const User = (props) =>{
const {user,getuser,user1,chat,setscreen} = props;
const user2 =user?.uid;
const [data,setdata] = useState('');
const id = user1 > user2 ? `${user1+user2}`:`${user2+user1}`
useEffect(()=>{
    
    let unsub = db.collection('lastmessage').doc(id).onSnapshot((doc)=>{
        setdata(doc.data());
    });
    return ()=> unsub()
},[])
    return <div className={`user ${chat.name === user.name && 'selecteduser'}`} onClick={()=>[getuser(user),setscreen(true)]}>
      <div className="user-info">
          <div className="user-details">
              <img src={user.avatar||Img} alt='avatar' className='avatar'/>
              <div>
              <h4>{user.name}{data?.from !== user1 && data?.unread && (<small className="unread">New</small>)}</h4>
              {data?<p className="truncate"><strong>{data.from===user1?'Me : ':null}</strong>{data.text}</p>:null} 
              </div>
          </div>
          <div className={`userstatus ${user.isOnline?'online':'offline'}`}></div>
      </div>
    </div>
}
export default User;