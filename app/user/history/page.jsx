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
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { RestaurantContext } from "@context/RestaurantContext";

export default function Home() {
  const { data: session, status } = useSession();
  const [active, setActive] = useState("active");
  const { user } = useContext(RestaurantContext);
  const [tasks, setTasks] = useState([]);
  console.log(tasks);
  const router = useRouter();
  useEffect(() => {
    if (user) {
      if (active === "active") {
        setTasks(user?.assignedTasks);
      } else if (active === "pending") {
        setTasks(user?.completed);
      } else if (active === "past") {
        (async () => {
          try {
            const { data } = await axios.get("/api/task/past-tasks");
            setTasks(data?.tasks);
          } catch (error) {
            console.log(error);
          }
        })();
      }
    }
  }, [user, active]);

  const getColor = (status) => {
    if (active === "past") {
      return "red";
    }
    if (status === "pending") {
      return "orange";
    }
    if (status === "complete") {
      return "green";
    }
    return;
  };

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
  } else if (user)
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
                <Stack
                  sx={{ width: "100%", marginTop: "20px" }}
                  direction="row"
                  justifyContent="space-around"
                >
                  <div
                    style={{
                      cursor: "pointer",
                      fontSize: "1.3em",
                      color: `${active === "active" ? "orange" : "white"}`,
                    }}
                    onClick={() => setActive("active")}
                  >
                    Active
                  </div>
                  <div
                    style={{
                      cursor: "pointer",
                      fontSize: "1.3em",
                      color: `${active === "pending" ? "orange" : "white"}`,
                    }}
                    onClick={() => setActive("pending")}
                  >
                    Pending
                  </div>
                  <div
                    style={{
                      cursor: "pointer",
                      fontSize: "1.3em",
                      color: `${active === "past" ? "orange" : "white"}`,
                    }}
                    onClick={() => setActive("past")}
                  >
                    Past
                  </div>
                </Stack>
                <Stack
                  direction="column"
                  spacing={3}
                  sx={{
                    overflowY: "scroll",
                    width: "100%",
                    display: "flex",
                    alignItems: "start",
                    paddingTop: "20px ",
                  }}
                >
                  {tasks.map((task) => {
                    return (
                      <Stack
                        key={task?._id}
                        direction="row"
                        sx={{
                          background: "white",
                          minHeight: "100%",
                          width: "100%",
                          padding: "20px",
                          borderRadius: "15px",
                        }}
                      >
                        <Avatar
                          src={task?.image}
                          sx={{
                            width: "50%",
                            height: "auto",
                            borderRadius: "1px",
                          }}
                        />
                        <Box
                          sx={{
                            marginLeft: "10px",
                            display: "flex",
                            alignItems: "start",
                            justifyContent: "start",
                            flexDirection: "column",
                          }}
                        >
                          <Typography>
                            <span
                              style={{
                                fontSize: "1.2em",
                                fontWeight: "800",
                                color: "black",
                              }}
                            >
                              NAME:
                            </span>
                            {"  "}
                            {task?.name}
                          </Typography>
                          <Typography>
                            <span
                              style={{
                                fontSize: "1.2em",
                                fontWeight: "800",
                                color: "black",
                              }}
                            >
                              Price:
                            </span>
                            {"  "}${task?.price}
                          </Typography>
                          <Typography>
                            <span
                              style={{
                                fontSize: "1.2em",
                                fontWeight: "800",
                                color: "black",
                              }}
                            >
                              Commision:
                            </span>
                            {"  "}${task?.commision}
                          </Typography>
                          <Typography>
                            <span
                              style={{
                                fontSize: "1.2em",
                                fontWeight: "800",
                                color: "black",
                                marginTop: "20px",
                              }}
                            >
                              Status:
                            </span>
                            {"  "}
                            <span
                              style={{
                                background: getColor(task?.status),
                                color: "white",
                                padding: "7px",
                                borderRadius: "8px",
                              }}
                            >
                              {active === "past" ? "past" : task?.status}
                            </span>
                          </Typography>
                        </Box>
                      </Stack>
                    );
                  })}
                </Stack>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </NavPage>
    );
}
