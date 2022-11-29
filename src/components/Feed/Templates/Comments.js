import React, {useEffect, useState} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';
import { Button } from '@material-ui/core';
import Collapsible from 'react-collapsible';
import { Avatar, Icon } from '@material-ui/core';
import "./Posts.css"
import Smallcomment from './smallcomment'


  /**
   * react default function
   * @param {int} user_id
   * @param {int} post_id
   */

function Comments({
    user_id,
    post_id
}) {
    const[receiverUser, updateReceiveruser]=useState(0)
    const[postdata, updatepostdata]=useState("")

      /**
   * fetches post using post_id
   * if data returns, post maker's id is stored in receiverUser, content in postdata
   * else error is logged in console
   */
    useEffect(() => {
        axios.get(`https://sunnysocial.herokuapp.com/api/post/postid`,{
        params: {
          post_id: post_id
        }
        })
        .then((response)=>{
          updateReceiveruser(response.data[0].user_id)
          updatepostdata(response.data[0].content)
        }).catch((err)=>{
          console.log(err)
        })
      }, []);
  

    const [postValue, submitPost]= useState("")

      /**
   * updates the postValue to match user input from keyboard
   * this is the comment user intends to post
   * @param {Object} event
   */
    function Posttext(event){
        submitPost(event.target.value);
    }

      /**
   * posts the comment when user clicks on post button
   * comment is the postValue and is stored with user_id the commenter and post_id of the post
   * otherwise error logged in console
   * also posts a notification when a comment is made
   */
    function Post_comment(){
        axios.post(`https://sunnysocial.herokuapp.com/api/comment`,
        {
           user_id: user_id,
           post_id: post_id,
           comment: postValue
       })
       .then((response)=>
          submitPost(""),
          
       )
       .catch((error)=>{
           console.log(error)
       })
       axios.post(`https://sunnysocial.herokuapp.com/api/notification`,{
        sender_user_id: user_id,
        receiver_user_id: receiverUser,
        title: "commented on your post",
        content: postdata
      }).then(console.log('success'))
      .catch((err)=>{console.log(err)})
    }

    const [comments, updatecomments]= useState([])
      /**
   * gets a list of comments underneath the post with post_id
   * if a list is returned it is stored in comments
   * otherwise error is displayed in console
   */
    useEffect(() => {
        axios.get(`https://sunnysocial.herokuapp.com/api/comment/query`,{
        params: {
          post_id: post_id
        }
        })
        .then((response)=>{
        updatecomments(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
      }, [post_id, postValue]);

    return (
        <div>
              <Collapsible className="comments-tab" trigger="Comments">
          <TextareaAutosize value={postValue} onChange={Posttext} className="comment-box" placeholder="Post your comment"/>
          <Button className="cmnt-pst-btn" onClick={Post_comment}>Post</Button>
          <div className="comments">
          {/* render all comments using map function from comments react hook array onto the Smallcomment template */}
           {comments.map(
            item=>(
                <Smallcomment
                comment= {item.comment}
                userID = {item.user_id}
                myID= {user_id}
                commentID= {item.comment_id}
                />
            )
          )}
          </div>
          </Collapsible>
        </div>
    );
}

export default Comments;
