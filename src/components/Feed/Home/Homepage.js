import React from 'react';
import Sidebar from '../Templates/sidebar.js'
import Widgets from "../widgets.js"
import Homefeed from './homefeed.js'
import './homepage.css'
import axios from 'axios'


function Homepage(props) {
    return (
        <div className="homepg">
        {/* renders sidebar */}
        <Sidebar/>

        {/* passes user token and cookies to homefeed
        homefeed uses these to fetch and render */}
        <Homefeed
            user = {props.user}
            token = {props.token}
        />

        {/* renders top post and ad placeholder */}
        <Widgets/>
        </div>
    );
}

export default Homepage;
