"use client";
import Navbar from "@components/Navbar";
import React, { useContext, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SpatialAudioIcon from "@mui/icons-material/SpatialAudio";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import RestoreIcon from "@mui/icons-material/Restore";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { IconButton, Stack } from "@mui/material";
import { RestaurantContext } from "@context/RestaurantContext";
import { useRouter } from "next/navigation";
import Call from "@components/CallModal";
import LiveChatScript from "@components/LiveChat";
import Sidebar from "@components/Sidebar";
import BasicModal from "@app/user/Modal";
import { ToastContainer } from "react-toastify";

const NavPage = ({ children, buttonNav, topNav, title, type }) => {
  const { active, setActive, handleOpen, open, setOpen } =
    useContext(RestaurantContext);
  const router = useRouter();
  const [chatVisible, setChatVisible] = useState(false);

  const toggleChat = () => {
    if (typeof window !== "undefined" && window.LiveChatWidget) {
      if (chatVisible) {
        window.LiveChatWidget.call("hide");
      } else {
        window.LiveChatWidget.call("maximize");
      }
      setChatVisible(!chatVisible);
    }
  };

  if (type === "dashboard") {
    <Navbar type="dashboard" data={session} />;
  } else
    return (
      <div
        style={{
          height: "100vh",
          overflowY: "scroll",
          position: "relative",
        }}
      >
        <Navbar fixed={false} topNav={topNav} title={title} type="dashboard" />
        <div className="dashboard">
          <div className="container-fluid ">
            <div className="row">
              <Sidebar />
              <div
                className="dashboard-content dashboard_row"
                style={{
                  width: "100%",
                }}
              >
                <div>
                  {children}
                  <BasicModal />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />

        {/* <LiveChatScript /> */}
      </div>
    );
};

export default NavPage;
