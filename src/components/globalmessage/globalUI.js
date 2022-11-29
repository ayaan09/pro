import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar'
import Messages from './Messages'
import './globalUI.css'
import axios from 'axios'
import Header from './Header'
import TextAreaAutosize from 'react-textarea-autosize'
function GlobalUI({user, token}) {
    
    const[messages, getmessages]= useState([])

    /**
   * get all message objects from the DB
   * set the messages array to the fetched data
   * if an error in encountered => display error
   */
    useEffect(()=>{
        axios.defaults.headers.common['x-auth-token'] = token;
        axios.get(`https://sunnysocial.herokuapp.com/api/message/global`)
        .then((response)=>{
          getmessages(response.data)
        })
        .catch((err)=>{
          console.log(err)
        })
    })

    const [messagevalue, change]=useState("")

    /**
   * change the messagevalue to whatever the user is typing in the message textbox
   * @param {Object} event
   */
    function messagechange(event){
        change(event.target.value)
        console.log(messagevalue)
    }

    /**
   * triggered when user hits on the send button
   * message object is sent to the DB
   * if an error is encountered, it is displayed
   */
    function postmessage(){
        axios.defaults.headers.common['x-auth-token'] = token;
        axios.post(`https://sunnysocial.herokuapp.com/api/message/global`, {
            body: messagevalue,
            from: user.name
        })
        .then((response)=>{
         change("")
        })
        .catch((err)=>{
          console.log(err)
        })
    }
    return (
        <div className="global">
        <Sidebar/>
        <div className="Chat">
        <Header 
          name="Global Chat"
        />
        <div className="form">
        <TextAreaAutosize placeholder=" Aa" className="text-area-chat" value={messagevalue} onChange={messagechange}/>
         <button className="send-btn btn btn-sm btn-primary"onClick={postmessage}>Send</button></div>
         {/* map all messages from messages array onto Messages template */}
        {messages.map(
            item=>(
              <Messages
              user= {item.from}
              message= {item.body}
              myId = {user.name}
              time = {item.date}
            />
            )
          )}
          </div>
        </div>
    );
}

export default GlobalUI;
