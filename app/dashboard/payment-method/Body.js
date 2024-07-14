"use client";

import Sidebar from "@components/Sidebar";
import { IconButton, Paper } from "@mui/material";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import WalletModal from "./Modal";

const Body = () => {
  const { data: session } = useSession();
  const [isWalletSet, setIsWalletSet] = useState(0);
  const [submiting, setSubmiting] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [adminWallets, setAdminWallets] = useState([]);
  const [wallet, setWallet] = useState("");
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = useState(null);
  const handleOpen = () => setOpen(true);
  const [state, setState] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/get-admin-wallet`);
        setAdminWallets(data?.wallets);
        setIsWalletSet(data?.wallets.length);
      } catch (error) {
        toast.error("Unable to fetch Wallet", {
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
    if (!walletAddress) {
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
    try {
      setSubmiting(true);
      const { data } = await axios.post(`/api/admin-upload-wallet`, {
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
  return (
    <div className="dashboard">
      <div className="container-fluid ">
        <div className="row">
          <Sidebar />
          <div
            className="dashboard-content dashboard_row"
            style={{
              width: "100%",
              height: "90vh",
              border: "0.1px solid #b7b2b2",
            }}
          >
            <div>
              <>
                <div className="dashboard-header clearfix">
                  <div className="row">
                    <div className="col-sm-12 col-md-6">
                      <h4>
                        Hi &#x1F44B;, {session?.user?.accountName}{" "}
                        {session?.user?.role === "admin" && (
                          <span style={{ fontSize: "12px", color: "red" }}>
                            Admin
                          </span>
                        )}{" "}
                        {session?.user?.role === "sub-admin" && (
                          <span style={{ fontSize: "12px", color: "red" }}>
                            Customer Service
                          </span>
                        )}{" "}
                      </h4>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div className="breadcrumb-nav">
                        <ul>
                          {/* <li>
                          <a href="/">Index</a>
                        </li> */}
                          <li>
                            <a
                              href="#"
                              className="active"
                              style={{ textDecoration: "underline" }}
                            >
                              payment method{" "}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container">
                  {isWalletSet < 2 && (
                    <div className="row">
                      <div className="col-lg-12">
                        <div
                          className="form-group"
                          style={{ marginTop: "10px" }}
                        >
                          <input
                            style={{ width: "100%" }}
                            type="text"
                            name="walletAddress"
                            className="input-text"
                            placeholder="Wallet Address"
                            onChange={(e) => setWalletAddress(e.target.value)}
                            value={walletAddress}
                          />
                        </div>
                        <div className="form-group">
                          <select
                            style={{
                              width: "100%",
                              border: "1px solid #beb8b8",
                              height: "50px",
                            }}
                            name="sex"
                            className="input-text"
                            onChange={(e) => setWallet(e.target.value)}
                            value={wallet}
                          >
                            <option value=""> Choose Network</option>
                            <option value="trc20">TRC20</option>
                            <option value="erc20">ERC20</option>
                          </select>
                        </div>
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
                              "Upload"
                            )}
                          </button>
                        </>
                      </div>
                    </div>
                  )}

                  <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="space-between"
                  >
                    {adminWallets &&
                      adminWallets.length > 0 &&
                      adminWallets.map((item, index) => {
                        return (
                          <Paper
                            key={index}
                            //   onClick={() => setActive("trc")}
                            sx={{
                              width: "100%",
                              height: "100px",
                              alignContent: "center",
                              padding: "10px",
                            }}
                          >
                            <Typography>
                              Wallet Address: {item?.walletAddress}
                            </Typography>
                            <Typography>Network: {item?.network}</Typography>
                            <IconButton
                              onClick={() => {
                                setActive(item);
                                handleOpen();
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Paper>
                        );
                      })}
                  </Stack>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <WalletModal
        open={open}
        setOpen={setOpen}
        activeWallet={active}
        setState={setState}
        setActive={setActive}
      />
    </div>
  );
};

export default Body;
