import React from "react"
import {useHistory, useParams} from 'react-router-dom'
import LocalUI from './localUI'
import Sidebar from '../globalmessage/Sidebar'
import Messages from '../globalmessage/Messages'
import '../globalmessage/globalUI.css'
import axios from 'axios'
import Header from '../globalmessage/Header'

function ChatRouter(props) {
  // id is obtained from user-entered URL
  // id is the name of the community whose feed is to be rendered
    const {id} =  useParams()

  return (
    <div className="cm-feed">

    
    {/* pass community name, cookies and token to the feed component */}
    <LocalUI
        tutor= {id}
        user = {props.user}
        token = {props.token}
    />


    </div>
  );
}

export default ChatRouter;