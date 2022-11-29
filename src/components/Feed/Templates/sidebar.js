import React from "react";
import "./sidebar.css";
import HomeIcon from '@material-ui/icons/Home'
import PublicIcon from '@material-ui/icons/Public';
import ChatIcon from '@material-ui/icons/Chat';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import SidebarOption from "./sidebarOptions"
import logo from './logo.png';


function Sidebar() {
    return (
        <div className="sidebar-hobbyt">
            <img className="img-hobbyt" src={logo} alt=''></img>
            <a href="/feed">
                <SidebarOption
                    Icon={HomeIcon}
                    text="Home"
                />
            </a>
            <a href="/tutor">
                <SidebarOption
                    Icon={PersonIcon}
                    text="Tutors"
                />
            </a>
            <a href="/notifications">
                <SidebarOption
                    Icon={PublicIcon}
                    text="Notifications"
                />
            </a>
            <a href="/chat">
                <SidebarOption
                    Icon={ChatIcon}
                    text="Chat"
                />
            </a>
            <a href="/community">
                <SidebarOption
                    Icon={GroupIcon}
                    text="Community"
                />
            </a>
            <a href="/mailbox">
                <SidebarOption
                    Icon={SettingsOutlinedIcon}
                    text="Mailbox"
                />
            </a>
            <a href="/logout">
                <SidebarOption
                    Icon={ExitToAppIcon}
                    text="Sign out"
                />
            </a>
        </div>

    );
}

export default Sidebar;
