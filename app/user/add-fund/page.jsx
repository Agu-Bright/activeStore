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
  Divider,
} from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import "./style.css";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import FlutterButton from "@components/FlutterConfig";
import { RestaurantContext } from "@context/RestaurantContext";
function formatDateString(dateString) {
  // Create a new Date object from the input date string
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date)) {
    return "Invalid date";
  }

  // Define options for formatting the date
  const options = {
    weekday: "long", // Full name of the day of the week (e.g., Monday)
    year: "numeric", // Full numeric representation of the year (e.g., 2021)
    month: "long", // Full name of the month (e.g., January)
    day: "numeric", // Numeric day of the month (e.g., 1)
  };

  // Format the date using the options
  return date.toLocaleDateString("en-US", options);
}

function formatAmountWithCommas(amount) {
  // Convert the amount to a string and use a regular expression to add commas
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [uploading, setUploading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [deposits, setDeposits] = useState("");
  const [image, setImage] = useState("");
  const { state, setState } = useContext(RestaurantContext);
  const handleScreenshot = () => {
    const el = document.getElementById("screenshot");
    if (el) {
      el.click();
    }
  };

  const handleSubmit = async () => {
    if (!amount && !paymentMethod) {
      toast.error("Amount and Payment Method, Required", {
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
      setLoading(true);
      const { data } = await axios.post("/api/deposit/create-deposit/", {
        amount: amount,
        method: paymentMethod,
      });
      toast.success("Deposit Successful", {
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
      setState((prev) => !prev);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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

  const handleUploadScreendhot = async (image) => {
    try {
      const { data } = await axios.post("/api/deposit/create-deposit/", {
        screenShot: image,
        amount: amount,
        method: paymentMethod,
      });
      toast.success("Deposit Successful", {
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
      setPaymentMethod("");
      setImage("");
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
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/deposit/get-my-deposits");
        console.log(data);
        setDeposits(data?.deposits.reverse());
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
  }, [state]);

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
        <div class="container">
          <div class="row p-3">
            <div class="col-12">
              <form>
                <p class="mt-3" style={{ fontWeight: "700" }}>
                  Top up your wallet easily using Bank Transfer or Card
                </p>

                <div class="card" style={{ marginBottom: "20px" }}>
                  <div class="card-body">
                    <h6 style={{ fontWeight: "700" }}>Enter Amount (NGN)</h6>
                    <input
                      style={{ margin: "10px 0px" }}
                      placeholder="Enter amount"
                      type="number"
                      name="amount"
                      onChange={(e) => setAmount(e.target.value)}
                      value={amount}
                      class="text-dark p-2 form-control inputField"
                      required=""
                    />
                  </div>
                </div>

                {/* {amount && (
                  <div class="card">
                    <div class="card-body">
                      <h6 class="mb-1 mt-1">Select Payment Gateway</h6>
                      <div class="d-flex align-items-center mb-3">
                        <div class="col-12">
                          <select
                            class="text-dark form-control2"
                            name="gateway"
                            required
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          >
                            <option value="">Select payment method</option>
                            <option value="instant">Instant Payment</option>
                            <option value="manual">Manual Payment</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )} */}

                {/* <div style={{ marginTop: "10px" }}>
                  {uploading ? (
                    <div
                      style={{
                        width: "150px",
                        height: "150px",
                        border: "0.1px solid #cacecf",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "5px",
                      }}
                    >
                      <CircularProgress sx={{ color: "rgba(0,212,255,1)" }} />
                    </div>
                  ) : (
                    <>
                      {image && (
                        <Avatar
                          src={image}
                          alt="screendhot"
                          sx={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "5px",
                          }}
                        />
                      )}
                    </>
                  )}
                </div> */}
              </form>
              {/* {paymentMethod === "manual" && !uploading && !image && (
                <button
                  onClick={() => handleScreenshot()}
                  className="btn-md  btn-block"
                  style={{
                    marginTop: "20px",
                    border: "none",
                    color: "white",
                    fontWeight: "800",
                    borderRadius: "10px",
                    fontSize: "1.2em",
                    background:
                      "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)",
                  }}
                >
                  {loading ? (
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  ) : (
                    "Click to upload screenshot"
                  )}
                </button>
              )}
              {image && (
                <button
                  onClick={() => handleUploadScreendhot(image)}
                  className="btn-md  btn-block"
                  style={{
                    marginTop: "20px",
                    border: "none",
                    color: "white",
                    fontWeight: "800",
                    borderRadius: "10px",
                    fontSize: "1.2em",
                    background:
                      "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)",
                  }}
                >
                  Deposit{" "}
                </button>
              )}
              {(!paymentMethod || paymentMethod === "instant") && (
                <button
                  onClick={() => handleSubmit()}
                  style={{
                    border: "none",
                    color: "white",
                    fontWeight: "800",
                    borderRadius: "10px",
                    fontSize: "1.2em",
                    background:
                      "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)",
                  }}
                  className="btn-md  btn-block"
                  disabled={paymentMethod ? false : true}
                >
                  {loading ? (
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  ) : (
                    "Continue"
                  )}
                </button>
              )} */}
              {amount && <FlutterButton amount={amount} session={session} />}{" "}
            </div>
            {/* 
            <input
              type="file"
              id="screenshot"
              style={{ display: "none" }}
              onChange={async (e) => {
                const file = e.target?.files;
                if (file) {
                  try {
                    setUploading(true);
                    const { data } = await axios.post(
                      "/api/cloudinaryupload/profile",
                      file
                    );
                    setImage(data?.photosArray[0].url);
                    setUploading(false);
                  } catch (error) {
                    setUploading(false);
                    toast.error("Unable to upload", {
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
                }

                // setImage()
              }}
            /> */}

            <Divider sx={{ margin: "20px 0px" }} />

            <div class="col-md-12">
              <h5 class="mt-4 mb-4">Latest Payments History</h5>
              {deposits && deposits.length === 0 && (
                <div class="card">
                  <div class="card-body text-center p-4">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.699126 22.1299L11.4851 0.936473C11.6065 0.697285 11.7856 0.49768 12.0036 0.358621C12.2215 0.219562 12.4703 0.146179 12.7237 0.146179C12.9772 0.146179 13.2259 0.219562 13.4439 0.358621C13.6618 0.49768 13.841 0.697285 13.9624 0.936473L24.7483 22.1299C24.8658 22.3607 24.9253 22.6205 24.9209 22.8835C24.9165 23.1466 24.8484 23.4039 24.7234 23.6301C24.5983 23.8562 24.4206 24.0434 24.2078 24.1732C23.995 24.303 23.7543 24.3708 23.5097 24.3701H1.93781C1.69314 24.3708 1.45252 24.303 1.23968 24.1732C1.02684 24.0434 0.849131 23.8562 0.724084 23.6301C0.599037 23.4039 0.530969 23.1466 0.526592 22.8835C0.522216 22.6205 0.581682 22.3607 0.699126 22.1299ZM14.2252 14.2749L14.9815 9.39487C15.0039 9.25037 14.9967 9.10237 14.9605 8.96116C14.9243 8.81995 14.8599 8.6889 14.7719 8.57713C14.6838 8.46536 14.5742 8.37554 14.4506 8.31391C14.327 8.25228 14.1925 8.22033 14.0563 8.22026H11.3912C11.255 8.22033 11.1204 8.25228 10.9969 8.31391C10.8733 8.37554 10.7637 8.46536 10.6756 8.57713C10.5876 8.6889 10.5232 8.81995 10.487 8.96116C10.4508 9.10237 10.4436 9.25037 10.466 9.39487L11.2223 14.2749H14.2252ZM14.7882 18.1096C14.7882 17.5208 14.5707 16.9561 14.1835 16.5398C13.7964 16.1234 13.2713 15.8895 12.7237 15.8895C12.1762 15.8895 11.6511 16.1234 11.2639 16.5398C10.8768 16.9561 10.6593 17.5208 10.6593 18.1096C10.6593 18.6984 10.8768 19.2631 11.2639 19.6794C11.6511 20.0957 12.1762 20.3296 12.7237 20.3296C13.2713 20.3296 13.7964 20.0957 14.1835 19.6794C14.5707 19.2631 14.7882 18.6984 14.7882 18.1096Z"
                        fill="#EA4335"
                      ></path>
                    </svg>
                    <br />
                    <br />

                    <h6>No data found</h6>
                  </div>
                </div>
              )}
            </div>

            <Stack
              direction="column"
              alignItems="center"
              sx={{ width: "100%", marginTop: "20px" }}
            >
              {deposits &&
                deposits.map((item, index) => {
                  return (
                    <Paper
                      key={index}
                      sx={{
                        padding: "10px",
                        marginBottom: "10px",
                        width: "99%",
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontWeight: "600" }}>
                          Deposit
                        </Typography>
                        <Typography sx={{ fontWeight: "600" }}>
                          ₦ {formatAmountWithCommas(item?.amount)}
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ color: "gray" }}>
                          {formatDateString(item?.createdAt)}
                        </Typography>
                        <Typography sx={{ color: getColor(item?.status) }}>
                          <span style={{ color: "black" }}>
                            Approval Status:
                          </span>{" "}
                          {item?.status}
                        </Typography>
                      </Stack>
                    </Paper>
                  );
                })}
            </Stack>
          </div>
        </div>
      </NavPage>
    );
}
