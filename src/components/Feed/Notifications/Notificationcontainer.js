import { Avatar } from '@material-ui/core';
import React from 'react';
import "./Notificationcontainer.css"  

function Notificationcontainer(props) {
    return (
        <div className="notif-container-tab">
        <Avatar className="avatar-notif" src ={props.src}/>
        {/* this checks if the notification is normal or a report notification
        if it is a report then changes color to red
        'Your post is the name we set the displayname to if it is a report notification
         */}
        <span style={{color: props.displayname === "Your post" ? "red" : "black"}} className="text-notif"> {props.timestamp} : {props.displayname} has {props.action}</span>
        <div>You posted: {props.content}</div>
      </div>
        
    );
}

export default Notificationcontainer;
