import React from 'react';
import Sidebar from '../Templates/sidebar.js'
import './Community.css'
import Community_container from './Community_container.js'

function Community(props) {
    return (
        <div className="community-container">
        <Sidebar className="sidebar-notif"/>
        {/* passes user cookies and token to community container template that renders list of communities */}
        <Community_container
            name="Community"
            user = {props.user}
            token = {props.token}
        />

        </div>
    );
}

export default Community;
