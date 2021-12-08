import React, { useEffect } from "react";
import { useState } from "react";
import db from "../firebase";
import { auth , storage } from "../firebase";
import User from "../components/user";
import Messageform from "../components/messageform";
import Message from "../components/message";
import Back from "../svg/back";

const Home = () =>{
const [users,setusers]=useState([]);
const [chat,setchat] = useState("");
const [text,settext] = useState('');
const [img,setimg] = useState('');
const [msgs,setmsgs] = useState('');
const [screen,setscreen] = useState(false);
const user1 = auth.currentUser.uid;

const getuser = async(user) =>{
    setchat(user);
    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1+user2}`:`${user2+user1}`;
    
    const myref = db.collection('messages').doc(id).collection('chat');
    const q = myref.orderBy('createdAt','asc');
    q.onSnapshot((queryselector) =>{
       let msgs=[];
       queryselector.forEach((doc)=>{
           msgs.push(doc.data());
       })
       msgs.length ?setmsgs(msgs):setmsgs('');
     })
    const docsnap = await db.collection('lastmessage').doc(id).get();
    if(docsnap.data() && docsnap.data().from !== user)
    {
        await db.collection('lastmessage').doc(id).update({
            unread:false
        })
    }
}

const handlesubmit = async(e)=>{
    e.preventDefault();
    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1+user2}`:`${user2+user1}`
let url;
if(img){
    const imgRef = storage.ref(`chatImages/${new Date().getTime()} ${img.name}`);
    const snap = await imgRef.put(img);
    const surl = await imgRef.getDownloadURL();
    url = surl;
    console.log(url);
}
    await db.collection('messages').doc(id).collection('chat').add({
        text,
        from:user1,
        to:user2,
        createdAt:new Date().toString(),
        media:url ||'',
    })
    await db.collection('lastmessage').doc(id).set({
        text,
        from:user1,
        to:user2,
        createdAt:new Date().toString(),
        media:url ||'',
        unread:true
    })
   settext('');
}

useEffect(()=>{
const useref = db.collection('users');
var q = useref.where('uid','not-in',[auth.currentUser.uid]);
const unsub = q.onSnapshot((queryselector)=>{
    let users = [];
    queryselector.forEach((doc)=>{
   users.push(doc.data());
    })
    setusers(users);
});
return () => unsub();

},[])
    return<> <div className="home">
    <div className={`users ${screen ?'display':null}`} >
     {users.map((user)=>{
        return <User key={user.uid} user={user} getuser={getuser} user1={user1} chat={chat} setscreen={setscreen}/>
     })}
    </div>
    <div className="msgs">
     {chat?<>
        
        <div className="user_message">
           {screen?<div onClick={()=>{setscreen(false)}}><Back /></div>:null} 
         <span><h3>{chat.name}</h3></span>
     </div>
     <div className='messages'>
           {
               msgs ? msgs.map((msg,i)=>{
                   return <Message key={i} msg={msg} user1={user1}/>
               }):<div className="no_chat"> Start Conversation </div>
           }
         </div>
         <Messageform handlesubmit={handlesubmit} text={text} settext={settext} setimg={setimg}/>
     </>:<div className="no_chat">Select an User to start conversation</div>
     }
    </div>
</div></>
}
export default Home;