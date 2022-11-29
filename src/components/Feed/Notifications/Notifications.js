import React, {useState, useEffect} from 'react';
import Sidebar from "../Templates/sidebar.js"
import Notification_div from "./Notification_div.js"
import "./Notifications.css"
import Homefeedheader from '../Templates/Homefeedheader'
import axios from 'axios';

function Notifications(props) {
    const[myNotifdata, updatenotifdata]=useState([])
    const receiverID= props.user.user_id

      /**
   * fetch a list of notifications whose receiver is the logged in user
   * If found, set the myNotifdata array to the fetched objects
   * otherwise console log the error
   */
    useEffect(()=>{
        axios.defaults.headers.common['x-auth-token'] = props.token;
        axios.get(`https://sunnysocial.herokuapp.com/api/notification/query`,{
            params:{
                receiver_user_id: receiverID
            }
        }).then((response)=>{
            updatenotifdata(response.data)
        }).catch((err)=>{
            console.log(err)
        })
    })

   

    return (
        <div className="notifications">
        <Sidebar className="sidebar-notif"/>
        <div className="feedHeader">
        <Homefeedheader 
               name= "Notifications"
           />
{/* 
           this maps all the notification objects strored in myNotifdata hook array onto the Notification_div 
           template */}
           
        {myNotifdata.map(
            item=>(
              <Notification_div
                name = "Notifications"
                id= {item.sender_user_id} 
                action= {item.title}
                timestamp = {item.date}
                content = {item.content}
              />
            )
          )}
            <div className="endnote">No More Notifications to Show</div>
        </div>
        <div className="padding"></div>
    
        </div>
    );
}

export default Notifications;
