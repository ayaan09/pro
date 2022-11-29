import React, {useEffect, useState} from "react";
import axios from "axios"
import "./homefeed.css";
import Posts from '../Templates/Posts.js'
import Homefeedheader from '../Templates/Homefeedheader.js'
require('dotenv').config()

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
};


function Homefeed(props){

// extracts userID from cookies
const userId= props.user.user_id;
const url = `https://sunnysocial.herokuapp.com/api/communityuser/query`


// initially list of communities user has joined is empty
const [communityID, setID]= useState([])

  

/**
   * react hook to fetch a list of communities the user has joined using axios
   * If a list is returned, communityID hook is made to store that list
   * otherwise the error is shown in the console
   */
    useEffect(() => {
    axios.defaults.headers.common['x-auth-token'] = props.token;
    axios.get(url,{
    params: {
      user_id:userId,
    }
    })
    .then((response)=>{
      setID(response.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }, []);

  // react hook holds the array of post objects to be displayed
  const [posts, setPosts]= useState([])

  //react hook holds an empty array that will be used in storing community IDs of user-joined communities
  const[a, set] = useState([])

  

  /**
   * react hook to fetch a list of community posts 
   * If a list is returned, the list is stored in posts hook
   * otherwise the error is shown in the console
   */
  useEffect(() => { 
    let data = a
    for (var i = 0; i < communityID.length; i++) {
      data.push(communityID[i].community_id)
          }     
      axios.defaults.headers.common['x-auth-token'] = props.token;  
    axios.get(`https://sunnysocial.herokuapp.com/api/post/query`,{
    params: {
      community_id: data
    }
    })
    .then((response)=>{
      setPosts(response.data)

    })
    .catch((err)=>{
      console.log(err)
    })

  }, [communityID]);



return(
    
<div className="homefeed">
  {/* {header} */}
  <Homefeedheader
      name = "Home"
  />
  <div className="feedheadhome"></div>
  
    {/* the map function maps all the objects stored in posts array using the Posts Template */}
    {posts.map(
            item=>(
              <Posts
                username= {item.user_id}
                displayName = {item.username}
                text = {item.content} 
                avatar = {props.icon}
                timestamp = {item.date}
                userid = {userId}
                post_id = {item.post_id}
                likeCount= {item.likes}
              />
            )
          )}
    <p className="endnote">Nothing more to show right now</p>
</div>
);
}
export default Homefeed;
