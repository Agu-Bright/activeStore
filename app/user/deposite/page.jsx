"use client";
import NavPage from "@components/navPage/NavPage";
import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Grid,
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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { RestaurantContext } from "@context/RestaurantContext";
export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { myWallet } = useContext(RestaurantContext);
  const [active, setActive] = useState("deposite");
  const [depositing, setDepositing] = useState();
  const [amount, setAmount] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "amount") {
      const numericPattern = /^-?\d+(\.\d+)?$/;
      if (numericPattern.test(e.target.value)) {
        setAmount(e.target.value);
      } else {
        console.log("null");
        setAmount("");
        return;
      }
    }
  };

  const handleDeposit = async () => {
    console.log("depositing");
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
      <NavPage buttonNav={false} topNav={true} title="Deposit">
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
                          onClick={() => setActive("deposit")}
                          sx={{
                            fontWeight: "750",
                            fontSize: "20px",
                            cursor: "pointer",
                            color: `${
                              active === "deposit" ? "orange" : "black"
                            }`,
                          }}
                        >
                          Deposit{" "}
                        </Typography>
                        <Typography
                          onClick={() => setActive("withdraw")}
                          sx={{
                            fontWeight: "750",
                            fontSize: "20px",
                            cursor: "pointer",
                            color: `${
                              active === "withdraw" ? "orange" : "black"
                            }`,
                          }}
                        >
                          Transaction history{" "}
                        </Typography>
                      </Stack>
                      <Divider sx={{ margin: "10px 0px" }} />

                      <div
                        style={{
                          fontWeight: "800",
                          fontSize: "1.3em",
                          margin: "20px 0px",
                        }}
                      >
                        USD {myWallet?.balance}.00
                      </div>
                      <Typography
                        sx={{
                          textAlign: "start",
                          color: "black",
                          fontWeight: "800",
                        }}
                      >
                        Deposit Amount:{" "}
                      </Typography>
                      <Box sx={{ width: "100%" }}>
                        <Grid
                          container
                          rowSpacing={1}
                          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                          <Grid item xs={4} sx={{ cursor: "pointer" }}>
                            <Paper
                              style={{ width: "110px", margin: "10px" }}
                              onClick={() => setAmount("100")}
                            >
                              <Typography>USD</Typography>
                              <Typography sx={{ fontWeight: "800" }}>
                                100
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={4} sx={{ cursor: "pointer" }}>
                            <Paper
                              style={{ width: "110px", margin: "10px" }}
                              onClick={() => setAmount("500")}
                            >
                              <Typography>USD</Typography>
                              <Typography sx={{ fontWeight: "800" }}>
                                500
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={4} sx={{ cursor: "pointer" }}>
                            <Paper
                              style={{ width: "110px", margin: "10px" }}
                              onClick={() => setAmount("1,500")}
                            >
                              <Typography>USD</Typography>
                              <Typography sx={{ fontWeight: "800" }}>
                                1,500
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={4} sx={{ cursor: "pointer" }}>
                            <Paper
                              style={{ width: "110px", margin: "10px" }}
                              onClick={() => setAmount("5000")}
                            >
                              <Typography>USD</Typography>
                              <Typography sx={{ fontWeight: "800" }}>
                                5,000
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={4} sx={{ cursor: "pointer" }}>
                            <Paper
                              style={{ width: "110px", margin: "10px" }}
                              onClick={() => setAmount("10000")}
                            >
                              <Typography>USD</Typography>
                              <Typography sx={{ fontWeight: "800" }}>
                                10,000
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={4} sx={{ cursor: "pointer" }}>
                            <Paper
                              style={{ width: "110px", margin: "10px" }}
                              onClick={() => setAmount("30000")}
                            >
                              <Typography>USD</Typography>
                              <Typography sx={{ fontWeight: "800" }}>
                                30,000
                              </Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                      </Box>
                      <Typography
                        sx={{ textAlign: "start", marginTop: "15px" }}
                      >
                        Deposit Amount{" "}
                      </Typography>
                      <div className="form-group" style={{ marginTop: "10px" }}>
                        <input
                          style={{ width: "100%" }}
                          type="text"
                          name="amount"
                          className="input-text"
                          placeholder="0.00"
                          onChange={handleChange}
                          value={amount}
                        />
                      </div>
                      <button
                        style={{ background: "orange" }}
                        onClick={() => {
                          if (amount) {
                            router.push(`/user/top_up?amount=${amount}`);
                          } else {
                            toast.error("No amount Inputed", {
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
                        }}
                        className="btn-md button-theme btn-block"
                        disabled={depositing}
                      >
                        {depositing ? (
                          <CircularProgress size={20} sx={{ color: "white" }} />
                        ) : (
                          "Deposite"
                        )}
                      </button>
                      <button
                        // onClick={() => handleDeposit()}
                        className="btn-md  btn-block"
                        style={{ color: "black" }}
                      >
                        Contact Support
                      </button>

                      <Divider sx={{ margin: "20px 0px" }} />

                      <div style={{ marginTop: "15px" }}>
                        <Typography
                          sx={{ textAlign: "start", fontWeight: "800" }}
                        >
                          Important Notice
                        </Typography>
                        <Typography
                          sx={{
                            textAlign: "start",
                            color: "gray",
                            fontSize: "0.8em",
                          }}
                        >
                          Operation hours [MON] - [SUN]: 10:00:00 23:59:00{" "}
                        </Typography>
                        <Typography
                          sx={{
                            textAlign: "start",
                            color: "gray",
                            fontSize: "0.8em",
                          }}
                        >
                          Minimum Withdrawal Amount : 20.00
                        </Typography>
                        <Typography
                          sx={{
                            textAlign: "start",
                            color: "gray",
                            fontSize: "0.8em",
                          }}
                        >
                          Maximum Withdrawal Amount: 9,999,990.00
                        </Typography>
                        <Typography
                          sx={{
                            textAlign: "start",
                            color: "gray",
                            fontSize: "0.8em",
                          }}
                        >
                          Daily withdrawal completed minimum orders: 25{" "}
                        </Typography>
                        <Typography
                          sx={{
                            textAlign: "start",
                            color: "gray",
                            fontSize: "0.8em",
                          }}
                        >
                          Withdrawal Fee 0.00%{" "}
                        </Typography>
                      </div>
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
