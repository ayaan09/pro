import React from 'react';
import './Messages.css'
function Messages(props) {
    return (
        <div className= {props.user===props.myId||props.user===props.mySid? "mymessage":"messages"} >
           <p className="userID">{props.user}</p>
           <div className="time">{props.time.substring(0,10)} {props.time.substring(11,16)} UTC </div>
           <p className="content-msg">{props.message}</p> 
        </div>
    );
}

export default Messages;