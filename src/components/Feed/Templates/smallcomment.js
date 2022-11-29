import { Avatar } from '@material-ui/core';
import React, { useState } from 'react';
import './smallcomment.css'
import Collapsible from 'react-collapsible'
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; 



  /**
   * render comments
   * @param {string} comment- comment content
   * @param {int} userID - user ID of postmaker
   * @param {int} myID - user ID of logged in user
   * @param {int} commentID - commentID of comment
   */

function Smallcomment({
    comment,
    userID,
    myID,
    commentID
}) {

    const[commentexists, commentdelete] = useState(true)
      /**
   * triggered when delete comment is pressed
   * deletes comment entry from DB
   * if an error is caught it is displayed
   */

    function deletecomment(){
        axios.delete(`https://sunnysocial.herokuapp.com/api/comment`, {
            data: {
                comment_id: commentID
            }
        }).then((response)=>{
            commentdelete(false)
        }).catch((error)=>console.log(error))
    }

      /**
       * triggered when report button is clicked
       * shows a prompt with commentID so it can be reported
   */

    function reportcomm(){
        confirmAlert({
            title: 'We value your opinions!',
            message: `you have flagged comment#${commentID} as inappropriate. Please contact system admin with the comment ID and your complaint`,
            buttons: [
              {
                label: 'Ok',
                onClick: () => null
              }
            ]
          });
    }
    return (
        <div>
       {commentexists===true&&
        <div className="a-comment">
        <Avatar/>@{userID} says: {comment}
        {/* shows delete or report comment based on whether the comment was made by the user or someone else */}
           <Collapsible trigger=" ••• " >{myID===userID&&<button onClick={deletecomment} className="btn btn-danger btn-sm">Delete comment
           </button>}{myID!==userID&&<button className="btn btn-dark btn-sm" onClick={reportcomm}>Report comment</button>}</Collapsible>
           </div>
        }
        </div>
    );
}

export default Smallcomment;
