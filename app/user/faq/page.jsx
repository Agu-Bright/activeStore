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
                  FAQ
                </h2>
                <div style={{ overflowY: "scroll" }}>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    1. Fund deposit
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    Due to the huge amount of information on the platform, users
                    need to contact CS to confirm and review the merchant's
                    wallet address before each recharge.{" "}
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    After the recharge is successful, the user needs to provide
                    a screenshot of the successful transfer record so that CS
                    can review the funds and update the platform account.
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    The recipient's name and transfer amount must match the
                    wallet address provided for the deposit to be successfully
                    reviewed.
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    If users encounter any problems during the recharge process,
                    please contact our online customer service for details!
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    2.About the order
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    The order price is adjusted according to the market value.{" "}
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    Order prices are randomly allocated based on the total
                    balance of the user's account.{" "}
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    The higher the user's account balance, the higher the price
                    of the item and therefore the higher the order revenue.
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    If the user is worried that the price of a certain product
                    is too high and unaffordable, please do not deposit too much
                    money and start placing orders.
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    3. Withdraw cash
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    Withdrawal time is from 10:00 to 23:59 every day.{" "}
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    4. Platform user mode Users can invite new users to become
                    platform users and receive additional referral commissions.
                    The referral fee plus 20% of the recommended task commission
                    (the commission is additionally awarded by the company and
                    will not affect any income of the referrer){" "}
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    5. Business hours Users can complete the product bonus plan
                    during daily business hours 10:00-23:59.
                  </Typography>

                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    Note: If you need further clarification, please click
                    "Customer Service" on the platform to contact our customer
                    service to ask your questions.
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
