import React, {useEffect, useState} from "react";
import axios from "axios"
import Sidebar from '../Feed/Templates/sidebar'
import Tutors from '../Feed/Templates/Tutors'
import Homefeedheader from "../Feed/Templates/Homefeedheader";
import '../Feed/Profile/Profile.css'
import Mails from './mails'
  /**
   * maps posts onto Posts templates
   * @param {Object} Template - contains the Post object which contains text content, username etc
   */


function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

function Mailbox(props){

// extracts userID from cookies
const userId= props.user.sid;
const url = `https://sunnysocial.herokuapp.com/api/message/getmessage`


// initially list of communities user has joined is empty
const [whosent, setSent]= useState([])

  

/**
   * react hook to fetch a list of communities the user has joined using axios
   * If a list is returned, communityID hook is made to store that list
   * otherwise the error is shown in the console
   */
    useEffect(() => {
    axios.defaults.headers.common['x-auth-token'] = props.token;
    axios.get(url,{
    params: {
      for:userId
    }
    })
    .then((response)=>{
      setSent(response.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }, []);
var sentIDS =[ ]

  var arrayLength = whosent.length;
  for (var i = 0; i < arrayLength; i++) {
    if (whosent[i].from!= props.user.sid){
      const children = sentIDS.push(whosent[i].from);
    }
    if (whosent[i].to!= props.user.sid){
      const another = sentIDS.push(whosent[i].to);
    }
  }
  sentIDS = sentIDS.filter(onlyUnique)
  console.log(sentIDS, props.user.sid);
return(
    <div className="profile-container">
    <Sidebar></Sidebar>
    <Mails
        sentIDS={sentIDS}
    />

</div>
);
}
export default Mailbox;
