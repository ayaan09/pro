import Avatar from 'react-avatar' 
import React, { useEffect, useState } from 'react';
import "./Posts.css"
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import Comments from './Comments'
import Likebutton from './Likebutton.js'
import axios from 'axios';
import Collapsible from 'react-collapsible';


  /**
   * Posts template
   * @param {string} username - user ID of user logged in
   * @param {string} displayName - name of post maker
   * @param {string} text - content of post
   * @param {string} image - dp of post maker
   * @param {date} timestamp - time of post
   * @param {int} userid - id of user
   * @param {int} likecount - no of likes on post
   * @param {int} post_id - post ID 
   */

function Posts({
    username,
    displayName,
    text,
    image, 
    timestamp,
    userid,
    likeCount,
    post_id
}) {

  const[commID, changecommID]=useState(0)

    /**
   * get communityID of community where post was made from postID 
   */
  useEffect(()=>{
    axios.get(`https://sunnysocial.herokuapp.com/api/post/postid`,{
      params:{
        post_id:post_id
      }
    }).then((res)=>{
      console.log(res)
      changecommID(res.data[0].community_id)
    })
  },[post_id])


    /**
   * triggered when delete button is pressed
   * if deletepost confirmed confirmDelete() is called
   * else nothing
   */
  function Deletepost(){
    confirmAlert({
      title: 'Deletion Confirmation',
      message: 'Are you sure you want to delete the post permanently?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => confirmDelete()
        },
        {
          label: 'No',
          onClick: () => null
        }
      ]
    });
  }

    /**
   * deletes post
   * deletes comments and likes associated with the post
   * if error=> display the error
   * refreshes window after deletion
   */

  function confirmDelete(){
    //delete the comments
      axios.delete('https://sunnysocial.herokuapp.com/api/comment/post',{
        data:{
          post_id: post_id
        }
        }).then((response)=>console.log(response))
        .catch((e)=>console.log(e))
       //delete comments of likes and the post
       axios.delete('https://sunnysocial.herokuapp.com/api/likepost/post',{
        data:{
          post_id: post_id
        }
        }).then((response)=>
        axios.delete('https://sunnysocial.herokuapp.com/api/post',{
          data:{
            post_id: post_id
          }
          }).then((response)=>response.status===200&&window.location.reload())
      .catch((e)=>console.log(e)))
    }


    /**
   * triggered when report button is clicked
   * prompts user to select category of report
   * sends report to server
   */
  function reportpost(){
    confirmAlert({
      title: `You have flagged post ${post_id} as inappropriate`,
      message: 'Why do you think the post is inappropriate',
      buttons: [
        {
          label: 'NSFW',
          onClick: () => handlereport("NSFW")
        },
        {
          label: 'Bullying',
          onClick: () => handlereport ("Bullying")
        },
        {
          label: 'Hate Speech',
          onClick: () => handlereport("Hate Speech")
        },

        {
          label: 'Spam',
          onClick: () => handlereport("Spam")
        }
      ]
    });
  }

    /**
   * handles report
   * if report is made it sends data to server
   * sends notification to user whose post has been reported
   */

  function handlereport(props){
    alert(`Reported Post For ${props}`)
    console.log(post_id, username, commID, text, props)
    axios.patch(`https://sunnysocial.herokuapp.com/api/post`, {
      post_id: post_id,
      user_id: username,
      community_id: commID,
      title: `POST FLAGGED FOR ${props}`,
      content: text
    })
    axios.post(`https://sunnysocial.herokuapp.com/api/notification`,{
      title: `been flagged as ${props} by a user`,
      sender_user_id: 1,
      receiver_user_id: username, 
      content: text
    })
  }

    return (
        <div className="post">
        <div className="post__avatar">
          <Avatar size = "60" color={Avatar.getRandomColor( ['red', 'green'])} round={true} name={displayName} />
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                {displayName}{" "}
                <span className="post__headerSpecial">
                   @
                  {username} 
                  <span className="timestamp">Posted on {timestamp} </span>
                </span>
                
              </h3>
            </div>
            <div className="post__headerDescription">
              <p>{text}</p>
            </div>
          </div>
          <img src={image} alt="" />
          <div className="post__footer">
            
            <Likebutton 
            post_id = {post_id}
            user_id = {userid}
            likeCount={likeCount}/> 
            {/* displays report or delete button based on whether it is the user's post or someone else's */}
            <Collapsible trigger="•••">
            {username!==userid&& <div> <button onClick={(reportpost)} className="btn btn-sm btn-dark">Report Post</button></div>}
            {username===userid&& <div> <button onClick={Deletepost} className="btn btn-sm btn-danger">Delete Post</button></div>}
            </Collapsible>
         
          </div>
          <div >
           <Comments
             user_id= {userid}
             post_id = {post_id}
           />
          </div>
        </div>
      </div>
        
    );
}

export default Posts;
