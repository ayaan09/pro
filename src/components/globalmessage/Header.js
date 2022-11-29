import React from 'react';
import { Button } from "@material-ui/core"
import './Header.css'


function Header(props) {
    return (
            <div className="feedheader">
    {/* {header} */}
    <h2 className="chat_header_home">Sunny Social/{props.name} </h2>
        </div>
    );
}

export default Header;