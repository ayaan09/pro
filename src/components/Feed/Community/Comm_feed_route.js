import React from "react";
import '../Communityfeed.css';
import Sidebar from "../Templates/sidebar.js";
import Feed from "../feed.js";
import Widgets from "../widgets.js";
import {useHistory, useParams} from 'react-router-dom';


function Comm_feed_route(props) {
  // id is obtained from user-entered URL
  // id is the name of the community whose feed is to be rendered
    const {id} =  useParams()


  return (
    <div className="cm-feed">
    {/* render sidebar */}
    <Sidebar/>
    
    {/* pass community name, cookies and token to the feed component */}
    <Feed
        Community_name= {id}
        user = {props.user}
        token = {props.token}
    />

    {/* render widgets */}
    <Widgets/>
    </div>
  );
}

export default Comm_feed_route;
