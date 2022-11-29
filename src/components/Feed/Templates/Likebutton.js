import React, {useEffect, useState} from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import './Likebutton.css'
import axios from 'axios'


function Likebutton({post_id, 
    user_id,
    }) {
      
    const[likestate, changelikestate]= useState("unliked")
    const[receiverUser, updateReceiveruser] = useState(0);
    const[nooflikes, changelikeno]= useState(0)
    const [postdata, updatepostdata]=useState("")


      /**
   * fetches user id of postmaker from post_id
   * sets user_id to receiverUser
   * fetches content of posts from post_id
   * sets content to postdata
   * if error in fetching any, error is console logged
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
      })
    }, []);


      /**
   * checks if user has liked the post
   * if an entry is found with user_id liking the post the button state is changed to liked
   * if an error is caught, it is displayed
   */
    useEffect(() => {
        axios.get(`https://sunnysocial.herokuapp.com/api/likepost/query`,{
        params: {
          user_id: user_id,
          post_id: post_id
        }
        })
        .then((response)=>{
          response.data.length!==0&&changelikestate("liked")
        }).catch((err)=>{console.log(err)})
      }, [post_id, likestate]);
     

        /**
   * Checks the number of likepost entries associated with the post
   * the number of likepsot are tallied and the count is displayed as total number of likes
   */
      useEffect(() => {
        axios.get(`https://sunnysocial.herokuapp.com/api/likepost/query`,{
        params: {
          post_id: post_id
        }
        })
        .then((response)=>{
            changelikeno(response.data.length)
        })
      }, [post_id]);

const[likepostid, changelikepostid]= useState(0)

  /**
   * function triggered when like button is pressed
   * if previous state was 'liked' it is changed to 'unliked' => likepost entry deleted from DB
   * if previous state was 'unliked' it is changed to 'liked'=> likepost entry added to DB
   * if an error is caught, it is displayed
   */
      function updateLikes(){
        axios.get(`https://sunnysocial.herokuapp.com/api/likepost/query`,{
            params: {
                user_id: user_id,
                post_id: post_id
              }
              })
              .then((response)=>{
                changelikepostid(response.data[0].likepost_id)
                console.log(response.data[0].likepost_id)
            }).catch((error)=>console.log(error))
          if (likestate==="liked"){
                axios.delete(`https://sunnysocial.herokuapp.com/api/likepost`,{
                data: {
                    likepost_id:likepostid
                    }
                  }).then((response)=>{
                      response.status==200&&changelikeno(nooflikes-1);
                      changelikestate("unliked")
                }, 
                 ) .catch((error)=>console.log(error))
          axios.patch(`https://sunnysocial.herokuapp.com/api/post/like`,{
            
              post_id: post_id,
              likes: nooflikes-1
         
          }).then((res)=>{console.log(res)}).catch((e)=>console.log(e))
          }else if (likestate==="unliked"){
            axios.post(`https://sunnysocial.herokuapp.com/api/likepost`,{
                    user_id: user_id,
                    post_id: post_id
                  }).then(changelikeno(nooflikes+1), changelikestate("liked")).catch((error)=>console.log(error))
            axios.post(`https://sunnysocial.herokuapp.com/api/notification`,{
              sender_user_id: user_id,
              receiver_user_id: receiverUser,
              title: "liked your post",
              content: postdata
            }).then(console.log('success'))
            .catch((err)=>{console.log(err)})
            axios.patch(`https://sunnysocial.herokuapp.com/api/post/like`,{
                post_id: post_id,
                likes: nooflikes+1
  
            }).then((res)=>{console.log(res)}).catch((e)=>console.log(e))
          
          }

      }

    return (
        <div>
        <button className="Likebutton" onClick={updateLikes}>
        {/* changes like button color based on state of button */}
            <ArrowUpwardIcon className="arrowIcon" fontSize= "small"  style={{color: likestate === "liked" ? "blue" : "black"}}/>
            {nooflikes}
        </button>
        </div>
    );
}

export default Likebutton;
