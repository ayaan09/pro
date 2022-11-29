import Avatar from 'react-avatar' 
import React, { useEffect, useState } from 'react';
import "./Posts.css"
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import Comments from './Comments'
import Likebutton from './Likebutton.js'
import axios from 'axios';
import Collapsible from 'react-collapsible';
import {Link} from 'react-router-dom'


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

function Tutors({
    username,
    displayName,
    text,
    image, 
    userid,
    post_id,
    message
}) {

  const[commID, changecommID]=useState(0)

    /**
   * get communityID of community where post was made from postID 
   */


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
                </span>
                
              </h3>
            </div>
            <div className="post__headerDescription">
              <p>{text}</p>
            </div>
          </div>
          <img src={image} alt="" />
          <div className="post__footer">
            
         
          </div>
          <div >

          </div>
        </div>
        <Link to = {`/tutor/${username}`}> 
        <button className="btn btn-success" style={{ maxWidth: '90px', marginTop:'10px', marginRight:'10px' }} > {message}
        </button>
      </Link>
      </div>
        
    );
}

export default Tutors;
