"use client";
import NavPage from "@components/navPage/NavPage";
import {
  Alert,
  CircularProgress,
  Divider,
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
import axios from "axios";
export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { myWallet, user } = useContext(RestaurantContext);
  const [amount, setAmount] = useState("");
  const [active, setActive] = useState("deposite");

  const [withdrawalPassword, setWithdrawalPassword] = useState("");
  const [submiting, setSubmiting] = useState(false);

  const handleSubmit = async () => {
    if (!withdrawalPassword || !amount) {
      toast.error("password and amount are required", {
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
      return;
    }
    if (user?.assignedTasks.length !== 0) {
      toast.error("You have uncompleted tasks", {
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
      return;
    }

    try {
      setSubmiting(true);
      const { data } = await axios.post("/api/withdraw/create-withdraw", {
        withdrawalPassword,
        amount,
      });
      console.log(data);
      setSubmiting(false);
      toast.success("Withdrawal Request Submited", {
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
      setAmount("");
      setWithdrawalPassword("");
    } catch (error) {
      setSubmiting(false);
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
      <NavPage buttonNav={false} topNav={true} title="Cash Withdrawal">
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
                          onClick={() => setActive("deposite")}
                          sx={{
                            fontWeight: "750",
                            fontSize: "20px",
                            cursor: "pointer",
                            color: `${
                              active === "deposite" ? "orange" : "black"
                            }`,
                          }}
                        >
                          Cash Withdrawal
                        </Typography>
                        <Typography
                          onClick={() => {
                            setActive("withdraw");
                            router.push("/user/all-record");
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
                          Withdraw History
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
                        USD{" "}
                        {Number(myWallet?.balance) + Number(myWallet.profit)}.00
                      </div>
                      <Typography sx={{ textAlign: "start", color: "gray" }}>
                        You will recieve your withdrawal within an hour
                      </Typography>
                      <Typography sx={{ textAlign: "start" }}>
                        Withdrawal Method{" "}
                      </Typography>
                      <select
                        style={{
                          marginTop: "10px",
                          width: "100%",
                          border: "0.1px solid #cbc4c4",
                          height: "40px",
                        }}
                      >
                        <option value="cryptocurrency">Cryptocurrency</option>
                      </select>
                      <div style={{ marginTop: "20px" }}>
                        <Typography sx={{ textAlign: "start", color: "gray" }}>
                          Amount
                        </Typography>
                        {/* <Typography
                          sx={{ textAlign: "start", fontWeight: "800" }}
                        >
                          {amount || 0}.00
                        </Typography> */}
                        <input
                          style={{ width: "100%" }}
                          type="number"
                          name="amount"
                          className="input-text"
                          placeholder="Amount"
                          onChange={(e) => setAmount(e.target.value)}
                          value={amount}
                        />
                      </div>
                      <Typography
                        onClick={() =>
                          setAmount(() => {
                            const value =
                              Number(myWallet?.balance) +
                              Number(myWallet.profit);
                            return value;
                          })
                        }
                        textAlign="end"
                        fontWeight="800"
                        sx={{ cursor: "pointer" }}
                      >
                        All
                      </Typography>

                      <div style={{ marginTop: "20px" }}>
                        {/* <Typography sx={{ textAlign: "start", color: "gray" }}>
                          Withdrawal Password
                        </Typography> */}
                        <input
                          style={{ width: "100%" }}
                          type="password"
                          name="withdrawalPassword"
                          className="input-text"
                          placeholder="Withdrawal Password"
                          onChange={(e) =>
                            setWithdrawalPassword(e.target.value)
                          }
                          value={withdrawalPassword}
                        />

                        {withdrawalPassword && (
                          <button
                            onClick={handleSubmit}
                            className="btn-md button-theme btn-block"
                            disabled={submiting}
                            style={{
                              color: "white",
                              background: "orange",
                              marginTop: "30px",
                            }}
                          >
                            {submiting ? (
                              <CircularProgress
                                size={20}
                                sx={{ background: "white" }}
                              />
                            ) : (
                              "Submit"
                            )}
                          </button>
                        )}
                      </div>

                      <Divider sx={{ margin: "20px 0px" }} />
                      <Alert severity="error">
                        {" "}
                        You can't withdraw money until its done 25 given orders
                      </Alert>

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
