import React, { useEffect, useState } from 'react';
import Sidebar from '../Templates/sidebar.js'
import './Profile.css'
import Profile_data from './Profile_data'
import axios from 'axios'

function Profile(props) {
    const[bio, updatebio]=useState("")
    const[picture, updatepic]=useState("")
    
      /**
   * fetches user bio and other data using userID
   * if data is returned, the bio and pic are set to the bio and picture empty strings
   * else an error is displayed on the console
   */
    useEffect(() => {
        axios.get(`https://sunnysocial.herokuapp.com/api/auth/user/query`,{
        params: {
          user_id: props.user.user_id,
        }
        })
        .then((response)=>{
         updatebio(response.data[0].bio)
         updatepic(response.data[0].picture)
        }).catch((error)=>console.log(error))
      }, []);
     
    return (
        <div className="profile-container">
        <Sidebar
        token = {props.token}
         className="sidebar-notif"/>

         {/* passes user data to the Profile_data templated for rendering profile */}
        <Profile_data
        icon ={picture}
        displayname= {props.user.name}
        username ={props.user.user_id}
        bio = {bio}
        token = {props.token}
        />
        
        </div>
    );
}

export default Profile;
