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
  Button,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import DownloadIcon from "@mui/icons-material/Download";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/logs/get-my-orders");
        console.log("orders", data);
        setOrders(data?.orders);
      } catch (error) {
        toast.error(error?.response?.data?.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    })();
  }, []);

  if (status === "loading") {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#EC5766",
        }}
      >
        <CircularProgress style={{ color: "#CDC5B4" }} />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/user/login");
  } else
    return (
      <NavPage>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "80vh",
          }}
        >
          <h5
            style={{
              textAlign: "start",
              width: "100%",
              fontWeight: "800",
            }}
          >
            Your Orders
          </h5>
          {orders && orders.length === 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Image width={250} height={250} src="/img/order.png" />
              <Typography>You have no order yet</Typography>
              <Button
                onClick={() => router.push("/user")}
                style={{
                  display: "flex",
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
                <Typography sx={{ color: "white" }}>Explore Logs</Typography>
              </Button>
            </div>
          )}

          {orders && orders.length > 0 && (
            <div style={{ width: "100%" }}>
              {orders.map((item) => (
                <Paper
                  key={item?._id}
                  sx={{
                    width: "100%",
                    padding: "15px 10px",
                    cursor: "pointer",
                    display: "flex",
                    padding: "2px",
                    marginTop: "10px",
                  }}
                >
                  <Box
                    sx={{
                      border: "2px solid white",
                      padding: "10px",
                      width: "100%",
                      borderRadius: "5px",
                      display: "flex",
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{ width: "100%" }}
                    >
                      <Box
                        sx={{
                          width: "70%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "start",
                        }}
                      >
                        <Box>
                          <Avatar
                            src="/img/facebook.png"
                            sx={{ borderRadius: "2px", marginRight: "15px" }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontWeight: "800",
                            fontSize: "1.5em",
                            marginRight: "15px",
                          }}
                        >
                          facebook
                        </Typography>
                        <Typography>hii</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Typography sx={{ marginRight: "10px" }}>
                          <span style={{ fontWeight: "800" }}>Stock:</span>
                          <span>10</span>
                        </Typography>
                        <IconButton>
                          <DownloadIcon />
                        </IconButton>
                      </Box>
                    </Stack>
                  </Box>
                </Paper>
              ))}
            </div>
          )}
        </div>
      </NavPage>
    );
}
