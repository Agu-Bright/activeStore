"use client";
import LiveChatScript from "@components/LiveChat";
import NavPage from "@components/navPage/NavPage";
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  Grid,
  Paper,
  IconButton,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";

import "swiper/css";
import TableList from "./Table";

import React from "react";
import Image from "next/image";

const Topic = ({ title, src }) => {
  return (
    <div>
      <Image src={src} alt="img" width={30} height={30} />
      <span style={{ marginLeft: "10px" }}>{title}</span>
    </div>
  );
};

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/logs/getCategories");
        setCategories(data?.categories);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (status === "loading") {
    return (
      <div
        className="contact-section overview-bgi"
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // background: "#EC5766",
        }}
      >
        <CircularProgress style={{ color: "white" }} />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/user/login");
  } else
    return (
      <NavPage>
        <Box sx={{ width: "100%", height: "100vh" }}>
          <Stack direction="row" justifyContent="space-between">
            <h2 style={{ fontSize: "1em" }}>
              <span style={{ color: "#8075ff", fontWeight: "800" }}>
                Welcome!!{" "}
              </span>
              <span style={{}}>{session?.user?.username}</span> 😇
            </h2>
            <h2 style={{ fontSize: "1em" }}>
              <span style={{ fontWeight: "800", paddingRight: "10px" }}>
                Balance:
              </span>
              <span style={{ textDecoration: "underline", cursor: "pointer" }}>
                0.00 USD
              </span>
            </h2>
          </Stack>
          <h1
            style={{
              textAlign: "center",
              fontWeight: "800",
              fontSize: "3em",
              background:
                "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Buy social accounts and channels
          </h1>
          <h6 style={{ textAlign: "center" }}>
            Leading marketplace to buy established Tiktok accounts, Youtube
            channels, Theme pages etc.
          </h6>

          <Box
            sx={{
              height: "30vh",
              border: "1px solid #e6dede",
              width: "100%",
              marginBottom: "20px",
            }}
          ></Box>
          <>
            {categories.length > 0 &&
              categories.map((category) => {
                return (
                  <TableList
                    key={category?.id}
                    category={category?.catType}
                    title={
                      <Topic title={category?.catType} src="/img/star.png" />
                    }
                  />
                );
              })}
          </>
          <>
            {categories.length == 0 && (
              <div
                style={{
                  width: "100%",
                  height: "50vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image src="/img/photo.png" width={200} height={200} />
                  <Typography sx={{ textAlign: "center", fontWeight: "800" }}>
                    No Log Uploaded yet
                  </Typography>
                  <a
                    href="/dashboard/upload-logs"
                    target="_blank"
                    style={{
                      border: "none",
                      color: "white",
                      fontWeight: "800",
                      borderRadius: "10px",
                      fontSize: "1.2em",
                      marginTop: "20px",
                      textAlign: "center",
                      background:
                        "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)",
                    }}
                    className="btn-md  btn-block"
                  >
                    Manage Logs{" "}
                  </a>
                  <Typography
                    style={{
                      fontWeight: "300",
                      fontSize: "0.8em",
                      marginTop: "10px",
                    }}
                  >
                    <span style={{ fontWeight: "800" }}>N/B:</span> {""} This
                    button is only visible my the admin
                  </Typography>
                </div>
              </div>
            )}
          </>
          {/* <TableList
            title={<Topic title="Facebook" src="/img/facebook-1.png" />}
          />
          <TableList title={<Topic title="Twitter" src="/img/twitter.png" />} />
          <TableList
            title={<Topic title="Instagram" src="/img/instagram.png" />}
          />
          <TableList title={<Topic title="Email" src="/img/gmail.png" />} />
          <TableList title={<Topic title="Others" src="/img/star.png" />} /> */}
        </Box>
      </NavPage>
    );
}
