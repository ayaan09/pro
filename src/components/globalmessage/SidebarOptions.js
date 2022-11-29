import { Badge } from "@material-ui/core";
import React from "react"
import "./SidebarOptions.css"


function SidebarOption({text, Icon}){
return(
<div className="sidebarOpt">
<span className="text-bar"> <Badge><Icon fontSize="large"/></Badge> {text}</span>
</div>
    );
}

export default SidebarOption; 