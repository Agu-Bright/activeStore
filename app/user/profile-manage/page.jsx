"use client";
import NavPage from "@components/navPage/NavPage";
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TopNav from "@components/topNav/TopNav";
import BasicModal from "./Modal";

export default function Home() {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const router = useRouter();

  console.log("status", session);

  if (status === "loading") {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress style={{ color: "orange" }} />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/user/login");
  } else
    return (
      <NavPage buttonNav={false} topNav={true} title="Your Account">
        <div
          className="contact-section overview-bgi"
          style={{ height: "95%", overflow: "hidden", flexDirection: "column" }}
        >
          {/* <TopNav title="Your Account" /> */}
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {/* <!-- Form content box start --> */}
                <div className="form-content-box">
                  {/* <!-- details --> */}
                  <div
                    className="details"
                    style={{
                      minHeight: "15vh",
                      color: "black",
                      borderRadius: "10px",
                    }}
                  >
                    <div
                      style={{
                        height: "auto",
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between">
                        <Typography>Account Name</Typography>
                        <Typography>{session?.user?.accountName} </Typography>
                      </Stack>
                      <Divider sx={{ margin: "10px 0px" }} />
                      <Stack direction="row" justifyContent="space-between">
                        <Typography>Phone Number</Typography>
                        <Typography>{session?.user?.phoneNumber} </Typography>
                      </Stack>
                    </div>
                  </div>
                  <div
                    className="details"
                    style={{
                      minHeight: "25vh",
                      color: "black",
                      marginTop: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <div
                      style={{
                        height: "auto",
                      }}
                    >
                      <Typography
                        onClick={() => {
                          setTitle("Update Password");
                          handleOpen();
                        }}
                        sx={{ cursor: "pointer" }}
                      >
                        Change Login Password
                      </Typography>
                      <Divider sx={{ margin: "10px 0px" }} />
                      <Typography
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          setTitle("Update Withdrawal Password");
                          handleOpen();
                        }}
                      >
                        Change Withdrawal Password
                      </Typography>
                      <Divider sx={{ margin: "10px 0px" }} />
                      <Typography
                        onClick={() => {
                          setTitle("Update Profile");
                          handleOpen();
                        }}
                        sx={{ cursor: "pointer" }}
                      >
                        Update Profile Information
                      </Typography>
                      <Divider sx={{ margin: "10px 0px" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p style={{ color: "white", zIndex: "999", marginTop: "30px" }}>
            Copyright @2024 Com Score. All Rights Reserved
          </p>
        </div>
        <ToastContainer />
        <BasicModal
          open={open}
          handleOpen={handleOpen}
          setOpen={setOpen}
          title={title}
        />
      </NavPage>
    );
}
