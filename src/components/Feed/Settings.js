import './Settings.css';
import { useState, useEffect } from "react";
import Axios from 'axios'

function Settings(props) {

  const [avatar, setAvatar] = useState("https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png")

  const userName = props.user.username

  const user_id = props.user.user_id

  const [bio, setBio] = props.user.bio

  const [blockList, setblockList] = useState([])

  const [communityList, setCommunityList] = useState([])

  useEffect(() => {
    Axios.get("https://sunnysocial.herokuapp.com/blockuser/", {
      params: {
        user_id: props.user.user_id
      }
    }).then((response) => { setblockList(response.data) })
      .catch(() => { alert("failure to retrieve blocked list") })
  }, [])

  const deleteBlockedUser = (del) => {
    Axios.delete("https://sunnysocial.herokuapp.com/delete/blockeduser", {
      params: {
        user_id: del.user_id,
        blockuser_id: del.blockuser_id
      }
    })
      .then(() => {
        setblockList(
          blockList.filter((newlist) => {
            return newlist.user_id != del.val.user_id
          })
        )
      })
  }




  



  function changeBio(newBio) {
    Axios.put("https://sunnysocial.herokuapp.com/api/auth/user/bio", {
      params: {
        user_id: props.user.user_id,
        bio: newBio
      }
    }).then(() => {
      setBio(newBio)
    }
    )
  }

  function changePassword(newPassword) {
    Axios.put("https://sunnysocial.herokuapp.com/api/auth/user/password", {
      params: {
        user_id: props.user.user_id,
        password: newPassword
      }
    }).then(() => { alert("Password updated") })

  }




  useEffect(() => {
    Axios.get("https://sunnysocial.herokuapp.com/api/community/query", {
      params: {
        user_id : props.user.user_id
      }
    })
      .then((response) => {
        setCommunityList(response.data)
      })
      .catch(() => alert("failure to retrieve community list"))
  }, [])

  const deleteCommunity = (delCom) => {
    Axios.delete("https://sunnysocial.herokuapp.com/api/community/", {
      params: {
        user_id: delCom.user_id,
        community_id: delCom.community_id
      }
    })
      .then(() => {
        setblockList(
          blockList.filter((newlist) => {
            return newlist.user_id != delCom.user_id
          })
        )
      })
  }









  return (
    <div className="App">

      <div className="top">

        <h1 className="title">Settings</h1>
        
      </div>

      <div className="dp">
        <div className="photo">
          <img className="profile_picture" src={avatar} />
        </div>
      </div>

      <div className="userName">
        <p>{userName}</p>
      </div>

      <div className="userId">
        <p>{user_id}</p>
      </div>

      <div className="bio">
        <p>{bio}</p>
      </div>


      <hr></hr>



      <div className="change_password">
        <div>
          <h3 className="upheader">🔑Change Password</h3>
        </div>
        <div><input className="upinput" type="text" onChange={() => changePassword(this.value)}></input></div>
      </div>

      <div className="update_bio">
        <div>
          <h3 className="ubheader">📕 Update bio</h3>
        </div>
        <div><input className="ubinput" type="text" onChange={()=>changeBio(this.value)}></input></div>
      </div>

      <hr></hr>

      <div className="blocked-people">
        <h1>🚫Blocked People</h1>
        {blockList.map((val) => {
          //looping thru all stuff in the data of userlist
          return (
            <div className='usercontainer'>
              <div className='userlist'>
                <h3 className="list">User id:  {val.blockuser_id}</h3>
              </div>
              <button className='removebtn'
                onClick={
                  () => { deleteBlockedUser(val) }
                }>❌</button>
            </div>
          )
        })}

      </div>
      <hr></hr>
      <div>
        <h1>👥Communities</h1>
        {communityList.map((val) => {
          //looping thru all stuff in the data of userlist
          return (
            <div className='usercontainer'>
              <div className='userlist'>
                <h3 className="list">Community id:  {val.community_id}</h3>
              </div>
              <button className='removebtn'
                onClick={
                  () => { deleteCommunity(val) }
                }>❌</button>
            </div>
          )
        })}

      </div>
      <hr></hr>
      <div className="aboutdiv">
        <button className="about" href="/src/hobbyt-background-logo.png">🛈 About</button>
      </div>
      <div>

      </div>

    </div>
  );
}

export default Settings;
