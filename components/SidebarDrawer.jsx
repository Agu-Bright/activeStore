"use client";
import React from "react";
import { Drawer, IconButton, Divider, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

function SideBarDrawer({ open, close }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={close}
      sx={{ "& .MuiDrawer-paper": { width: "60vw" } }}
    >
      <>
        <div className="sidebar_nav" style={{ width: "60vw" }}>
          <div className="dashboard-inner">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "60vw",
              }}
            >
              <IconButton onClick={() => close()}>
                <CloseIcon sx={{ color: "red" }} />
              </IconButton>
            </div>
          </div>
        </div>
      </>
    </Drawer>
  );
}

export default SideBarDrawer;
