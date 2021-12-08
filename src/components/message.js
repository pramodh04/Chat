import { useEffect, useRef } from "react";
import Moment from "react-moment";

const Message = (props)=>{
const {msg,user1} = props;
const scrollref = useRef();


useEffect(()=>{
    scrollref.current?.scrollIntoView({behaviour:"smooth"})
},[msg])

    return <>
    <div className={`message_container ${msg.from === user1 ?"own":"" }`} ref={scrollref}>
        <p className={msg.from === user1 ? "me" : "friend"}>
            {msg.media?<img src={msg.media} alt={msg.text}/>:null}
            {msg.text}
            <br/>
            <small>
            <Moment fromNow>{msg.createdAt}</Moment>
            </small>
        </p>
    </div>
    </>
}
export default Message;