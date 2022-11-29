import React from 'react';
import { Button } from "@material-ui/core"
import './Homefeedheader.css'



function Homefeedheader(props) {
    return (
            <div className="feedheader">
    {/* {header} */}
    <h2 className="feed_header_home">Sunny Social/{props.name} </h2>
        </div>
    );
}

export default Homefeedheader;
