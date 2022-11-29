// import { Widgets } from "@material-ui/icons";
import React,{useEffect, useState} from "react";
import "./widgets.css";
import BootstrapCarousel from './Templates/carousel'
import axios from "axios";
import Avatar from 'react-avatar'

function Community(){
  const[post, upd]=useState({})
  const[usern, updateusrn]=useState(0)

  /**
   * get post with highest like
   * store it in post object
   */
  useEffect(()=>{
    axios.get(`https://sunnysocial.herokuapp.com/api/post/likesort`)
    .then((response)=>{
      upd(response.data[0])
    })
  },[])

  /**
   * get list of all users, tally them up
   * store the count in usern
   */
  useEffect(()=>{
    axios.get(`https://sunnysocial.herokuapp.com/api/auth/user/all`)
    .then((response)=>{
      updateusrn(response.data.length)
    })
  },[])
    return(

      <div className= "widgets">
      <div className="user-number">{usern} users and growing!</div>
        <div className="top-post">
          <div className="head">Top Post</div>
          <Avatar name={post.username} round={true} size = "40" color={Avatar.getRandomColor( ['red', 'green'])}/> <span className="dpname">{post.username}</span> 
          <span className="user-id"> @({post.user_id})</span>
          <div className="date">posted on {post.date}</div>
          <h3>{post.content}</h3>
          <p>{post.likes} likes</p>
          </div>



        <div className="widgets1">
   <BootstrapCarousel ></BootstrapCarousel>  
        </div>
        </div>
    );
}
export default Community; 
