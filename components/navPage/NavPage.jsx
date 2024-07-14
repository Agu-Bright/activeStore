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
        <Navbar fixed={false} topNav={topNav} title={title} />
        {children}
        {buttonNav !== false && (
          <div className="butom_nav_bar">
            <Stack direction="row" justifyContent="space-around">
              <IconButton
                onClick={() => {
                  router.push("/user");
                  setActive("home");
                }}
              >
                <HomeIcon
                  style={{ color: `${active === "home" ? "orange" : "gray"}` }}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  setActive("audio");
                  toggleChat();
                }}
              >
                <SpatialAudioIcon
                  style={{ color: `${active === "audio" ? "orange" : "gray"}` }}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  setActive("play");
                  router.push("/user/tasks");
                }}
              >
                <PlayCircleIcon
                  style={{ color: `${active === "play" ? "orange" : "gray"}` }}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  setActive("rev");
                  router.push("/user/history");
                }}
              >
                <RestoreIcon
                  style={{ color: `${active === "rev" ? "orange" : "gray"}` }}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  setActive("account");
                  router.push("/user/account");
                }}
              >
                <PersonOutlineIcon
                  style={{
                    color: `${active === "account" ? "orange" : "gray"}`,
                  }}
                />
              </IconButton>
            </Stack>
          </div>
        )}
        <Call open={open} setOpen={setOpen} />
        <LiveChatScript />
      </div>
    );
};

export default NavPage;
