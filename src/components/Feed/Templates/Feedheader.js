import React from 'react';
import { Button } from "@material-ui/core"
import './Feedheader.css'


function Feedheader(props) {
    return (
            <div className="feedheader">
    {/* {header} */}
    <h2 className="header_home">Sunny Social/{props.Community_name} Community</h2>
    {/* <span className="join-btn"><Button className= "post-btn" >+ Join</Button></span> */}
        </div>
    );
}

export default Feedheader;
