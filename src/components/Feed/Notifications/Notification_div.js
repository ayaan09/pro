import React, {useEffect, useState} from 'react';
import "./Notification_div.css"
import Homefeedheader from '../Templates/Homefeedheader.js'
import Notificationcontainer from './Notificationcontainer.js'
import axios from 'axios'



  /**
   * react function default
   * @param {string} string, @param {string} action
   * @param {date} timestamp, @param {string} content
   * @param {int} id 
   */

function Notification_div({name, action,timestamp, content, id}) {
    const[dpname,changedpname]= useState("")

      /**
   * searches up user's name from user ID from variable id passed to the main function
   * if user's name is found it is stored in dpname hook
   * else error is logged in console
   */
    useEffect(()=>{
        axios.get(`https://sunnysocial.herokuapp.com/api/auth/user/query`,{
            params:{
                user_id: id
            }
        }).then((response)=>{
            changedpname(response.data[0].name)
        }).catch((err)=>{
            console.log(err)
        })
    })

return(
        <div className="notifdiv">
        {/* renders the notifications if name action and timestamp are all present in data */}
         {name&&action&&timestamp&&
           <Notificationcontainer
                timestamp = {timestamp}
                displayname = {dpname}
                action = {action}
                content = {content}
           />
           }
        </div>
)
}

export default Notification_div;
