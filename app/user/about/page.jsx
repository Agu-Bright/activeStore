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
                  About Us
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
                    Comscore, we believe in bringing trust and transparency to
                    media and marketing, so businesses can use data to drive
                    growth.{" "}
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    Comscore, we believe in bringing trust and transparency to
                    media and marketing, so businesses can use data to drive
                    growth.{" "}
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    WHO WE ARE Comscore is a trusted partner for planning,
                    transacting and evaluating media across platforms. With
                    transformative data science and vast audience insights
                    across digital, linear TV, over-the-top (OTT) and theatrical
                    viewership, we are a powerful third-party source for
                    reliable measurement of cross-platform audiences.
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    A new model for a new world Media disruption has upended the
                    way marketers and media companies connect with audiences to
                    drive growth. To make decisions with confidence, the world’s
                    leading businesses need an independent partner for
                    understanding consumer behavior across platforms.
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    As a pioneering audience measurement company, Comscore was
                    founded with a mission to solve the most complex challenges
                    in the media ecosystem. Today, that challenge is accurately
                    measuring audiences in an increasingly cross-platform world.
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    Just the facts Partners Comscore plays an integral role in
                    the media ecosystem. Our partners include the largest
                    television networks, digital media properties, brands,
                    agencies, and film studios in the world.
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    Employees: More than 1,300 people worldwide comprise
                    Comscore’s team of data scientists, product engineers,
                    customer success partners, and more. Our core values of
                    Customer Focus, Collaboration, Curiosity, Simplicity,
                    Accountability, Inclusivity, and underpinning everything we
                    do, Integrity.
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    Leadership Our Leadership Team is comprised of
                    entrepreneurs, problem-solvers, engineers and brand-builders
                    who are passionate about solving the most complex challenges
                    in the media ecosystem. Career Build your career at a
                    company that’s innovating at the nexus of media
                    transformation. We’re hiring bright, ambitious people who
                    are motivated by big challenges across all our offices.
                    Interested?
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    Headquarters Comscore is headquartered in Reston, Virginia,
                    USA, with offices around the world.
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    Investor Relations Shares of Comscore stock are currently
                    traded on NASDAQ under NASDAQ:SCOR. Visit IR.comscore.com
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
