import React from "react";
import './Communityfeed.css';
import Sidebar from "./Templates/sidebar.js"
import Feed from "./feed.js"
import Widgets from "./widgets.js"
import phy_templates from './post-templates-physics'

function Communityfeed(props) {
  return (
    <div className="cm-feed">
    <Sidebar/>
    <Feed
        Community_name= {props.Community_name}
    />
    <Widgets/>
    </div>
  );
}

export default Communityfeed;
