import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "./Community_container.css"
import Homefeedheader from '../Templates/Homefeedheader'
import Community_tab from './Community_tab.js'

function Community_container(props) {
    // UserID stores the user ID from cookies
    const UserID= props.user.user_id;

    // list of communities. Initially empty Array, to be populated later
    const [communitylist, setlist]=useState([])


      /**
   * fetch a list of all the communities from the database
   * the list is stored in communitylist array
   */
    useEffect(() => {
    axios.defaults.headers.common['x-auth-token'] = props.token;    
    axios.get(`https://sunnysocial.herokuapp.com/api/community`)
    .then((response)=>{
    setlist(response.data)
    })
}, []);


    return (
        <div className="communitydiv">
        {/* header displays community name */}
                <Homefeedheader
                name= {props.name}
/>

{/* uses map function to render the list of communities onto the Community_tab template */}
{communitylist.map(
            item=>(
                <Community_tab
                name = {item.name}
                description = {item.description}
                userID= {UserID}
                token = {props.token}
            />
            )
          )}
        </div>
    );
}

export default Community_container;

