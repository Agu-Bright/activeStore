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
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

export default function Home() {
  const { data: session, status } = useSession();

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
      <NavPage buttonNav={false} topNav={true}>
        <div
          className="contact-section overview-bgi"
          style={{ height: "95%", overflow: "hidden" }}
        >
          <div className="container">
            <div className="row">
              <div
                className="col-lg-12"
                style={{
                  height: "100vh",
                  paddingTop: "150px",
                  paddingRight: "100px",
                  paddingLeft: "100px",
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "flex-start",
                  color: "white",
                  flexDirection: "column",
                  marginBottom: "100px",
                }}
              >
                <h2
                  style={{
                    color: "white",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  T & C
                </h2>
                <div style={{ overflowY: "scroll" }}>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                    }}
                  >
                    Welcome to Task-Box Group and its services!
                  </Typography>

                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                      marginTop: "10px",
                    }}
                  >
                    In order to protect the security of this website and
                    Task-Box Group, you should read the following "Software and
                    Services License" ("Software" or "Agreement"). You need to
                    fully understand the terms and conditions, particularly the
                    terms of service and restrictions, and the separate
                    agreements for each term, and accept or reject liability.
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                      marginTop: "10px",
                    }}
                  >
                    If you are over 18 years old, becoming a user of this
                    website means that you have read and agreed to this
                    agreement and related terms, otherwise you will not have the
                    right to download, install software and enjoy this service.
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                      marginTop: "10px",
                    }}
                  >
                    (A) Protection of users’ personal information
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                      marginTop: "10px",
                    }}
                  >
                    1.1 The protection of users’ personal information and
                    creators’ information is the basic principle of this
                    website. All Task-Box Group information uses professional
                    encrypted storage and transmission channels to ensure user
                    safety. If information is leaked without the consent of the
                    original author, this site will be held accountable in
                    accordance with the law.{" "}
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                      marginTop: "10px",
                    }}
                  >
                    1.2 Users need to provide some necessary information when
                    using this service. For example, in order to register an
                    account, users need to fill in their mobile phone number and
                    agree to the relevant terms of use. If the information
                    provided by the user is incomplete, the user may be
                    restricted during use.
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                      marginTop: "10px",
                    }}
                  >
                    1.3 Under normal circumstances, users can modify the
                    submitted information at any time. For security reasons
                    (such as account retrieval services), users may not be able
                    to change personal information at will after registration.
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                      marginTop: "10px",
                    }}
                  >
                    1.4 Task-Box Group uses various security technologies and
                    procedures and has a complete management system to protect
                    users' personal information. Any use or unauthorized use at
                    any time will be subject to legal action.
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                      marginTop: "10px",
                    }}
                  >
                    1.5 Under no circumstances will Task-Box Group disclose user
                    information to companies and organizations outside Task-Box
                    Group without the user's consent.
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                      marginTop: "10px",
                    }}
                  >
                    1.6 For persons under the age of 18, written information
                    from a parent or law enforcement official is required before
                    accessing the services of this website.
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                      marginTop: "10px",
                    }}
                  >
                    (B) User Responsibilities 2.1 Users need to complete a set
                    of tasks before they can apply for withdrawal.
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                      marginTop: "10px",
                    }}
                  >
                    2.2 Users cannot withdraw money during the optimization
                    process.
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                      marginTop: "10px",
                    }}
                  >
                    2.3 Users All order transactions are randomly assigned by
                    the system. Once the system accepts and assigns an order
                    transaction, it is strictly prohibited to change, cancel or
                    abandon the booking.
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                      marginTop: "10px",
                    }}
                  >
                    2.4 Users must complete all orders within 24 hours to ensure
                    that the task is effective
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                      marginTop: "10px",
                    }}
                  >
                    2.5Users who make large withdrawals for the first time need
                    to pay 20-50% personal income tax. Task-Box promises to
                    apply for a tax refund after completing the first payment.
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                      marginTop: "10px",
                    }}
                  >
                    (C) Terms and Conditions
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                      marginTop: "10px",
                    }}
                  >
                    3.1 Agreement: The user contract and service terms shall be
                    subject to the terms stated in the account. Users should
                    provide relevant information and documents to this website
                    and attach them to the contract terms.{" "}
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                      marginTop: "10px",
                    }}
                  >
                    3.2 This website provides services to all users in
                    accordance with these Terms. If you have any questions or
                    other necessary inquiries, please contact the department for
                    feedback.{" "}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </NavPage>
    );
}
