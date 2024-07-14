"use client";
import NavPage from "@components/navPage/NavPage";
import { Alert, CircularProgress, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import axios from "axios";
import { RestaurantContext } from "@context/RestaurantContext";

export default function Home() {
  const { data: session, status } = useSession();
  const { myWallet } = useContext(RestaurantContext);
  myWallet && console.log(myWallet);
  const router = useRouter();

  const [screen, setScreen] = useState(1);

  const [submiting, setSubmiting] = useState(false);
  const [withdrawalPassword, setWithdrawalPassword] = useState("");
  const [wallet, setWallet] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const handleSubmit = async () => {
    console.log("submit");
    if (!withdrawalPassword) {
      toast.error("Withdrawal Password required", {
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
    try {
      setSubmiting(true);
      const { data } = await axios.post(`/api/auth/withdrawal-auth`, {
        withdrawalPassword,
      });
      if (data?.success) {
        toast.success("Success", {
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
        setScreen(2);
      }
      setSubmiting(false);
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

  const handleUpdateWalletAddress = async () => {
    if (!wallet && !walletAddress) {
      toast.error("Wallet Address and Network Type is required", {
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
    if (!wallet) {
      toast.error("Network is Required required", {
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
    if (!walletAddress) {
      toast.error("Network is Required required", {
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
      const { data } = await axios.put(`/api/upload-wallet`, {
        wallet,
        walletAddress,
      });
      if (data?.success) {
        toast.success("Success", {
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
        setScreen(2);
      }
      setSubmiting(false);
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
  } else
    return (
      <NavPage buttonNav={false} topNav={true} title="Bind Wallet Address">
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
                        marginTop: "150px",
                        marginBottom: "60px",
                      }}
                    >
                      {screen === 1 && (
                        <div style={{ display: "flex" }}>
                          <AccountBalanceIcon />

                          <Typography
                            sx={{
                              textAlign: "start",
                              color: "black",
                              fontWeight: "800",
                            }}
                          >
                            Enter Your Withdrawal Password{" "}
                          </Typography>
                        </div>
                      )}
                      {screen === 2 && (
                        <div style={{ display: "flex" }}>
                          <AccountBalanceIcon />

                          <Typography
                            sx={{
                              textAlign: "start",
                              color: "black",
                              fontWeight: "800",
                            }}
                          >
                            Upload Wallet Details{" "}
                          </Typography>
                        </div>
                      )}
                      {screen === 1 && (
                        <>
                          <Typography
                            sx={{ textAlign: "start", marginTop: "15px" }}
                          >
                            Withdrawal Password{" "}
                          </Typography>
                          <div
                            className="form-group"
                            style={{ marginTop: "10px" }}
                          >
                            <input
                              style={{ width: "100%" }}
                              type="password"
                              name="withdrawalPassword"
                              className="input-text"
                              placeholder=""
                              onChange={(e) =>
                                setWithdrawalPassword(e.target.value)
                              }
                              value={withdrawalPassword}
                            />
                            <div
                              style={{
                                color: "green",
                                textAlign: "start",
                                width: "100%",
                              }}
                            >
                              Withdrawal password needs to be verified
                            </div>{" "}
                          </div>
                          <button
                            onClick={handleSubmit}
                            className="btn-md button-theme btn-block"
                            disabled={submiting}
                            style={{ color: "orange" }}
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
                        </>
                      )}
                      {screen === 2 && (
                        <>
                          <Typography
                            sx={{ textAlign: "start", marginTop: "15px" }}
                          >
                            Wallet Address{" "}
                          </Typography>
                          <div
                            className="form-group"
                            style={{ marginTop: "10px" }}
                          >
                            <input
                              style={{ width: "100%" }}
                              type="text"
                              name="walletAddress"
                              className="input-text"
                              placeholder=""
                              onChange={(e) => setWalletAddress(e.target.value)}
                              value={walletAddress || myWallet?.walletAddress}
                            />
                          </div>
                          <div className="form-group">
                            <select
                              name="sex"
                              className="input-text"
                              onChange={(e) => setWallet(e.target.value)}
                              value={wallet || myWallet?.network}
                            >
                              <option value=""> Choose Network</option>
                              <option value="trc20">TRC20</option>
                              <option value="erc20">ERC20</option>
                            </select>
                          </div>
                          {!session?.user?.walletAddress && (
                            <>
                              <button
                                onClick={handleUpdateWalletAddress}
                                className="btn-md button-theme btn-block"
                                disabled={submiting}
                                style={{ background: "orange" }}
                              >
                                {submiting ? (
                                  <CircularProgress
                                    size={20}
                                    sx={{ color: "white" }}
                                  />
                                ) : (
                                  "Submit"
                                )}
                              </button>
                            </>
                          )}
                          <Alert
                            severity="error"
                            sx={{ marginTop: "20px", textAlign: "start" }}
                          >
                            {" "}
                            You only can edit once. Please contact customer
                            service for any changes
                          </Alert>
                        </>
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
