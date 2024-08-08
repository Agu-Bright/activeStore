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
// import { useSearchParams } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  // const query = useSearchParams();
  // console.log("query", query);
  // const cat = query.get("cat");
  // console.log("cat", cat);
  // const [logs, setLogs] = useState([]);

  // useEffect(() => {
  //   cat &&
  //     (async () => {
  //       try {
  //         //fetch logs based on category
  //         const { data } = await axios.post("/api/logs/get-category-logs", {
  //           category: cat,
  //         });
  //         console.log(data);
  //         setLogs(data?.logs);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     })();
  // }, [cat]);

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
          //   background: "#EC5766",
        }}
      >
        <CircularProgress style={{ color: "#CDC5B4" }} />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/user/login");
  } else return <NavPage>Popular products</NavPage>;
}
