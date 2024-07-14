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
  const today = dayjs();
  const { data: session, status } = useSession();
  const [date, setDate] = useState();
  const [active, setActive] = useState("deposite");

  const [deposits, setDeposits] = useState([]);
  const [withdraws, setWithdraws] = useState([]);
  const [profits, setProfits] = useState([]);

  useEffect(() => {
    if (date) {
      active === "deposite" &&
        (async () => {
          try {
            const { data } = await axios.post(`/api/get-today-deposit`, {
              date,
            });
            console.log(data);
            setDeposits(data?.deposits);
          } catch (error) {
            console.log(error);
          }
        })();
      active === "withdraw" &&
        (async () => {
          try {
            const { data } = await axios.post(
              `/api/withdraw/get-today-withdrawal`,
              {
                date,
              }
            );
            console.log(data);
            setWithdraws(data?.withdraws);
          } catch (error) {
            console.log(error);
          }
        })();

      active === "profits" &&
        (async () => {
          try {
            const { data } = await axios.post(`/api/get-all-profit`, {
              date,
            });
            console.log(data);
            setProfits(data?.profits);
          } catch (error) {
            console.log(error);
          }
        })();
    }
  }, [date]);
  const router = useRouter();

  const getColor = (status) => {
    if (status === "success") {
      return "green";
    }
    if (status === "pending") {
      return "orange";
    }
    if (status === "rejected") {
      return "red";
    }
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
  } else
    return (
      <NavPage buttonNav={false} topNav={true} title="Transaction History">
        <div
          className="contact-section overview-bgi"
          style={{ height: "95%", overflow: "hidden" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {/* <!-- Form content box start --> */}
                <div className="form-content-box">
                  {/* <!-- details --> */}
                  <div
                    className="details"
                    style={{
                      height: "100vh",
                      color: "black",
                      overflowY: "scroll",
                    }}
                  >
                    <div
                      style={{
                        height: "auto",
                        marginTop: "100px",
                        marginBottom: "60px",
                      }}
                    >
                      <Stack direction="row" justifyContent="space-around">
                        <Typography
                          onClick={() => {
                            setActive("deposite");
                            setDate("");
                          }}
                          sx={{
                            fontWeight: "750",
                            fontSize: "20px",
                            cursor: "pointer",
                            color: `${
                              active === "deposite" ? "orange" : "black"
                            }`,
                          }}
                        >
                          Deposite
                        </Typography>
                        <Typography
                          onClick={() => {
                            setActive("withdraw");
                            setDate("");
                          }}
                          sx={{
                            fontWeight: "750",
                            fontSize: "20px",
                            cursor: "pointer",
                            color: `${
                              active === "withdraw" ? "orange" : "black"
                            }`,
                          }}
                        >
                          Withdraw
                        </Typography>
                        <Typography
                          onClick={() => {
                            setActive("profits");
                            setDate("");
                          }}
                          sx={{
                            fontWeight: "750",
                            fontSize: "20px",
                            cursor: "pointer",
                            color: `${
                              active === "profits" ? "orange" : "black"
                            }`,
                          }}
                        >
                          Profit
                        </Typography>
                      </Stack>
                      <Divider sx={{ margin: "10px 0px" }} />
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          maxDate={today}
                          onChange={(newValue) => {
                            console.log(newValue);
                            const dateTimeString = newValue?.format(
                              "YYYY-MM-DD HH:mm:ss"
                            );
                            setDate(dateTimeString);
                          }}
                          sx={{
                            width: "100%",
                            marginBottom: "15px",
                            "& .MuiOutlinedInput-root": {
                              borderColor: "orange",
                              "&:hover > fieldset": { borderColor: "orange" },
                              "&:focus > fieldset": { borderColor: "orange" },
                              borderRadius: "25px",
                            },
                          }}
                        />
                      </LocalizationProvider>
                      <>
                        {deposits &&
                          active === "deposite" &&
                          deposits.map((item, index) => {
                            return (
                              <Paper
                                key={index}
                                sx={{ padding: "10px", marginBottom: "10px" }}
                              >
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >
                                  <Typography sx={{ fontWeight: "600" }}>
                                    Deposit
                                  </Typography>
                                  <Typography sx={{ fontWeight: "600" }}>
                                    USD {item?.amount}
                                  </Typography>
                                </Stack>
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >
                                  <Typography sx={{ color: "gray" }}>
                                    {item?.createdAt}
                                  </Typography>
                                  <Typography
                                    sx={{ color: getColor(item?.status) }}
                                  >
                                    {item?.status}
                                  </Typography>
                                </Stack>
                              </Paper>
                            );
                          })}
                      </>
                      <>
                        {withdraws &&
                          active === "withdraw" &&
                          withdraws.map((item, index) => {
                            return (
                              <Paper
                                key={index}
                                sx={{ padding: "10px", marginBottom: "10px" }}
                              >
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >
                                  <Typography sx={{ fontWeight: "600" }}>
                                    Withdrawal
                                  </Typography>
                                  <Typography sx={{ fontWeight: "600" }}>
                                    USD {item?.amount}
                                  </Typography>
                                </Stack>
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >
                                  <Typography sx={{ color: "gray" }}>
                                    {item?.createdAt}
                                  </Typography>
                                  <Typography
                                    sx={{ color: getColor(item?.status) }}
                                  >
                                    {item?.status}
                                  </Typography>
                                </Stack>
                              </Paper>
                            );
                          })}
                      </>
                      <>
                        {profits &&
                          active === "profits" &&
                          profits.map((item, index) => {
                            return (
                              <Paper
                                key={index}
                                sx={{ padding: "10px", marginBottom: "10px" }}
                              >
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >
                                  <Typography sx={{ fontWeight: "600" }}>
                                    Profit
                                  </Typography>
                                  <Typography sx={{ fontWeight: "600" }}>
                                    USD {item?.amount}
                                  </Typography>
                                </Stack>
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >
                                  <Typography sx={{ color: "gray" }}>
                                    {item?.createdAt}
                                  </Typography>
                                  <Typography
                                    sx={{ color: getColor(item?.status) }}
                                  >
                                    {item?.status}
                                  </Typography>
                                </Stack>
                              </Paper>
                            );
                          })}
                      </>

                      {active === "deposite" && deposits.length === 0 && (
                        <Box
                          sx={{
                            padding: "20px 10px",
                            background: "#ffc200",
                            borderRadius: "10px",
                          }}
                        >
                          <Typography sx={{ fontWeight: "700" }}>
                            No Transaction History
                          </Typography>
                        </Box>
                      )}

                      {active === "withdraw" && withdraws.length === 0 && (
                        <Box
                          sx={{
                            padding: "20px 10px",
                            background: "#ffc200",
                            borderRadius: "10px",
                          }}
                        >
                          <Typography sx={{ fontWeight: "700" }}>
                            No Transaction History
                          </Typography>
                        </Box>
                      )}
                      {active === "profits" && profits.length === 0 && (
                        <Box
                          sx={{
                            padding: "20px 10px",
                            background: "#ffc200",
                            borderRadius: "10px",
                          }}
                        >
                          <Typography sx={{ fontWeight: "700" }}>
                            No Transaction History
                          </Typography>
                        </Box>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </NavPage>
    );
}
