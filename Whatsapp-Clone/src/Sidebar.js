import React from "react";
import "./css/Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="https://dhlm2eb86cbhs.cloudfront.net/public/thumbs/news/2020/07/32003/facebook-avatar-main_425_735.jpg" />

        <div className="sidebar__headerRight">
          {/* for clicakble icons */}
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search"></div>
      <div className="sidebar__chat"></div>
    </div>
  );
};

export default Sidebar;
