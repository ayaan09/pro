import React, { useState, useEffect } from "react";
import axios from "axios"
import "./feed.css";
import Postbox from './postbox.js'
import Posts from './Templates/Posts'
import Feedheader from './Templates/Feedheader.js'

/**
   * maps posts onto Posts templates
   * @param {Object} Template - contains the Post object which contains text content, username etc
   */

export function CreatePost(Template){
    return(
        <Posts
            text={Template.text}
            username ={Template.username}
            displayName = {Template.displayName}
            timestamp = {Template.timestamp}
            image =  {Template.image}
        />
    )
}


function Feed(props){
    const [posts, setposts]= useState([])
    const [communityid, setcommunityid] = useState('')


    /**
   * gets community ID from community name
   * stored community ID in communityid hook
   * if error is caught it is displayed
   */
    useEffect(() => {
    axios.defaults.headers.common['x-auth-token'] = props.token;
    axios.get(`https://sunnysocial.herokuapp.com/api/community/query`,{
    params: {
      name: props.Community_name
    }
    })
    .then((response)=>{
      setcommunityid(response.data[0].community_id)    
    
    })
    .catch((error)=>{
      console.log(error)
    })
  }, []);

/**
   * gets all posts in a community by making a query with community ID
   * if data is returned all post objects are stored in posts array
   * otherwise, error is displayed
   */
  useEffect(() => {
    axios.defaults.headers.common['x-auth-token'] = props.token;
    axios.get(`https://sunnysocial.herokuapp.com/api/post/query`,{
    params: {
        community_id: communityid
    }
    })
    .then((response)=>{
      setposts(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }, [communityid]);
  
return(
    
<div className="feed">
  {/* {header} */}
  <Feedheader
      Community_name={props.Community_name}
  />
    {/* {post box} */}
    <Postbox
      user ={props.user}
      community_id = {communityid}
      token = {props.token}
    />

    {/* posts mapped from posts array onto Posts template */}
    {posts.map(
            item=>(
              <Posts
                username= {item.user_id}
                displayName = {item.username}
                text = {item.content}
                avatar = {item.avatar}
                timestamp ={item.date}
                userid = {props.user.user_id}
                post_id = {item.post_id}
                likeCount = {item.likes}
              />
            )
          )}
    <p className="endnote">Nothing more to show right now</p>
</div>
);
}
export default Feed;
