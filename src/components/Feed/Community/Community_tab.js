import {Link} from 'react-router-dom'
import axios from 'axios';
import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import "./Community_tab.css"  



function Community_tab(props){
     const[joinstate, setstate] = useState("+Join");
     const [community_id, changecommunityID] = useState(0);
     const [community_user_id, changecommuserid]= useState(0)
     const userID= props.userID


       /**
   * get the community ID of the community whose name is stored in props
   * if the ID is found the ID is stored in community_id hook
   * otherwise, the error is displayed in console
   */
     useEffect(() => {
      axios.defaults.headers.common['x-auth-token'] = props.token; 
      axios.get(`https://sunnysocial.herokuapp.com/api/community/query`,{
      params: {
        name: props.name
      }
      })
      .then((response)=>{
        changecommunityID(response.data[0].community_id)
      })
      .catch((error)=>{
        console.log(error)
      })
    }, []);


      /**
   * checks if the user has joined the community to render the join button appropriately
   * a query is sent to check if the user ID and communityID are stored together in an entry in community user list
   * if it returns the entry, the user has joined the community => button state changed to 'Joined'
   * if it returns nothing, user has not joined community => button stays as '+Join'
   * otherwise, if error is returned it is displayed in the console
   */

     useEffect(() => {
      axios.defaults.headers.common['x-auth-token'] = props.token;
        axios.get(`https://sunnysocial.herokuapp.com/api/communityuser/query`,
        {
        params: {
          user_id: userID,
          community_id: community_id
        }
        })
        .then((response)=>{
          console.log(response.data)
          response.data.length!==0&&setstate("Joined")
          response.data.length!==0&&changecommuserid(response.data[0].communityuser_id)
        })
        .catch((error)=>{
          console.log(error)
        })
      }, [community_id]);

        /**
   * triggered when join button is clicked
   * If previous state was joined=> button changed to '+Join'. Requests database to delete community user entry
   related to the user
   * if previous state was "+Join" => button changed to 'joined'. requests server to add user to community user
   list in database
   */
      function Changejoin(){
        if (joinstate==="Joined"){
          setstate("+Join")
          console.log(community_user_id)
          axios.defaults.headers.common['x-auth-token'] = props.token;
          axios.delete(`https://sunnysocial.herokuapp.com/api/communityuser`,{
            data:{
            communityuser_id: community_user_id}
          }).catch((error)=>{
            console.log(error)
          })
        }else if(joinstate==="+Join"){
          setstate("Joined")
          axios.defaults.headers.common['x-auth-token'] = props.token;
          axios.post(`https://sunnysocial.herokuapp.com/api/communityuser`,{
            user_id: userID,
            community_id: community_id
          }).catch((error)=>{
            console.log(error)
          })
        }
      }

    return (
        // individual tabs with community name and description displayed
        // tabs are embedded with link to the respective community feed
        <div className="community-tab">
        <Link to = {`/community/${props.name}`}>
        <div className="cm-name">{props.name} Community</div>
        <div className="cm-description">{props.description}</div>
        </Link>
        <div><Button onClick={Changejoin} className="join-btn">{joinstate}
            </Button></div>
        </div>
    );
}

export default Community_tab;
