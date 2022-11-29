import './Profile_data.css'
import axios from 'axios'
import Avatar from 'react-avatar';
import React, { useState, useEffect } from 'react';
import Homefeedheader from '../Templates/Homefeedheader'
import { Button } from '@material-ui/core';
import Posts from '../Templates/Posts'
import Tutors from '../Templates/Tutors'
import Collapsible from 'react-collapsible'
import TextareaAutosize from 'react-textarea-autosize'

function Profile_data(props) {
    const user_id= props.username
    const [posts, setposts]= useState([])
    const [bioval, changebioval] = useState("")
    const [mybio, updatedbio]= useState(props.bio)
    const[tutors,changetutor] = useState([])

    useEffect(() => {
      axios.defaults.headers.common['x-auth-token'] = props.token; 
      axios.get(`https://sunnysocial.herokuapp.com/api/community/teachers`)
      .then((response)=>{
        changetutor(response.data)
      })
      .catch((error)=>{
        console.log(error)
      })
    }, []);

    // dummy values
    

      /**
   * Changes mybio empty string to the bio obtained from props
   */
    useEffect(()=>{
      updatedbio(props.bio)
      
    },[props.bio])

    /**
   * fetches all the posts made by the user
   * sets the post objects to the posts empty array
   * otherwise console log the error
   */
    useEffect(() => {
      axios.defaults.headers.common['x-auth-token'] = props.token;
        axios.get(`https://sunnysocial.herokuapp.com/api/post/query`,{
        params: {
          user_id: user_id
        }
        })
        .then((response)=>{
          setposts(response.data)
        }).catch((err=>{
          console.log(err)
        }))
      }, []);


        /**
   * changes bio val whenever the new bio value is set and the update button is pressed
   * @param {Object} event
   */
function textme(event){
  changebioval(event.target.value)
}

  /**
   * when bio is updated, this function sends the bio value to the database for storing it
   */
     function updateBio(){
        axios.defaults.headers.common['x-auth-token'] = props.token;
        const bio = bioval
          axios.patch(`https://sunnysocial.herokuapp.com/api/auth/user/bio`,{
            user_id: user_id,
            bio: bioval
          })
          .then((response)=>{
            updatedbio(bio)
            changebioval("")
          }).catch((e)=>console.log(e))
     }

    return (
        <div className="my_profile">
         <Homefeedheader
            name= "Tutors"
           />
           <div style={{fontSize:'1.3em', margin:'8px',padding:'5px' }}>
            To sign up as a tutor please click <a href='https://sunnysocial.herokuapp.com/registration' style={{color:'blue'}}>here</a>
           </div>
            {tutors.map(
            items=>(
              <Tutors
                username={items.sid}
                displayName={items.firstname + ' '+ items.lastname}
                text={"Hi, I am a Year " + items.year+' '+ items.level+" student studying "+items.major }
                image={items.pic}
                userid={items.sid}
                post_id={items.postid}
                message={"Contact Tutor"}
                />)
          )}
            <div className="footer-of-profile">No more items to show</div>
        </div>
    );
}

export default Profile_data;
