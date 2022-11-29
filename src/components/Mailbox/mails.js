import React, {useEffect, useState} from "react";
import axios from "axios"
import Sidebar from '../Feed/Templates/sidebar'
import Tutors from '../Feed/Templates/Tutors'
import Homefeedheader from "../Feed/Templates/Homefeedheader";
import '../Feed/Profile/Profile_data.css'

function Mails({sentIDS}){
    console.log(sentIDS)
    return(
        <div className="my_profile">
        <Homefeedheader
            name= "Mailbox"
        />
  
    {sentIDS.map(
        items=>(
          <Tutors
            username={items}
            displayName={"Messages from "+ items}
            message={"Open Chat"}
            />
            )
      )}
      </div>

    );

}

export default Mails;
    