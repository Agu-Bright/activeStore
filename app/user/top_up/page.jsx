"use client";
import NavPage from "@components/navPage/NavPage";
import {
  Avatar,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Suspense, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const TopUp = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const query = useSearchParams();
  const [active, setActive] = useState("trc");
  const [depositing, setDepositing] = useState();
  const [transactionHash, setTransactionhash] = useState("");
  const [image, setImage] = useState("");
  image && console.log(image);

  const handleScreenshot = () => {
    const el = document.getElementById("screenshot");
    if (el) {
      el.click();
    }
  };
  const [wallets, setWallets] = useState(null);
  wallets && console.log(wallets);
  const [current, setCurrent] = useState();

  const handleCopy = (item) => {
    if (item) {
      navigator.clipboard
        .writeText(item)
        .then(() => {
          toast.success("Copied to Clipboard", {
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
          // Optionally, display a notification or toast here
        })
        .catch((err) => {
          toast.error("copy failed", {
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
        });
    }
  };

  useEffect(() => {
    wallets &&
      setCurrent(() => {
        const _dWallet = wallets.find((item) => item?.network === "trc20");
        return _dWallet;
      });
  }, [wallets]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/get-admin-wallet`);
        console.log(data);
        setWallets(data?.wallets);
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
  }, []);

  const setActiveWallet = (network, _wallets) => {
    setCurrent(() => {
      const _dWallet = wallets.find((item) => item?.network === network);
      return _dWallet;
    });
  };
  const handleUpload = async () => {
    if (current) {
      const amount = query.get("amount");
      try {
        const { data } = await axios.post("/api/deposit/create-deposit/", {
          transactionHash: transactionHash,
          amount: amount,
          network: current?.network,
        });
        toast.success("Deposit Submited", {
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
        setTimeout(() => {
          router.push("/user/deposite");
        }, 1000);
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
    }
  };
  const handleUploadScreendhot = async (image) => {
    if (current) {
      const amount = query.get("amount");
      try {
        const { data } = await axios.post("/api/deposit/create-deposit/", {
          screenShot: image,
          amount: amount,
          network: current?.network,
        });
        toast.success("Deposit Submited", {
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
        setTimeout(() => {
          router.push("/user/deposite");
        }, 1000);
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
                      {/* choosing ======================= ========================= */}
                      {wallets && wallets.length > 0 && (
                        <Stack
                          spacing={2}
                          direction="row"
                          justifyContent="space-between"
                        >
                          <Paper
                            onClick={() => {
                              setActive(wallets[0]?.network);
                              setActiveWallet(wallets[0]?.network, wallets);
                            }}
                            sx={{
                              width: "100%",
                              height: "100px",
                              alignContent: "center",
                              cursor: "pointer",
                            }}
                          >
                            <Typography
                              sx={{
                                color: `${
                                  active === wallets[0]?.network
                                    ? "red"
                                    : "black"
                                }`,
                              }}
                            >
                              Payment Method 1
                            </Typography>
                            <Typography
                              sx={{
                                color: `${
                                  active === wallets[0]?.network
                                    ? "red"
                                    : "black"
                                }`,
                              }}
                            >
                              {wallets[0]?.network}
                            </Typography>
                          </Paper>
                          <Paper
                            onClick={() => {
                              setActive(wallets[1]?.network);
                              setActiveWallet(wallets[1]?.network, wallets);
                            }}
                            sx={{
                              width: "100%",
                              height: "100px",
                              alignContent: "center",
                              cursor: "pointer",
                            }}
                          >
                            <Typography
                              sx={{
                                color: `${
                                  active === wallets[1]?.network
                                    ? "red"
                                    : "black"
                                }`,
                              }}
                            >
                              Payment Method 2
                            </Typography>
                            <Typography
                              sx={{
                                color: `${
                                  active === wallets[1]?.network
                                    ? "red"
                                    : "black"
                                }`,
                              }}
                            >
                              {wallets[1]?.network}
                            </Typography>
                          </Paper>
                        </Stack>
                      )}

                      <Divider sx={{ margin: "20px 0px" }} />

                      <Typography
                        sx={{
                          textAlign: "start",
                          color: "black",
                          fontWeight: "800",
                        }}
                      >
                        Wallet Address{" "}
                      </Typography>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography>{current?.walletAddress}</Typography>
                        <IconButton
                          onClick={() => handleCopy(current?.walletAddress)}
                        >
                          <ContentCopyIcon />
                        </IconButton>
                      </Stack>
                      <div>
                        <Typography
                          sx={{
                            textAlign: "start",
                            marginTop: "15px",
                            color: "black",
                            fontWeight: "800",
                          }}
                        >
                          Network{" "}
                        </Typography>
                        <Typography sx={{ textAlign: "start" }}>
                          {active === "trc20" ? "TRC20" : "ERC20"}
                        </Typography>
                      </div>

                      <div>
                        <Typography
                          sx={{
                            textAlign: "start",
                            marginTop: "15px",
                            color: "black",
                            fontWeight: "800",
                          }}
                        >
                          Deposit Amount{" "}
                        </Typography>
                        <Typography sx={{ textAlign: "start" }}>
                          {query.get("amount")} = USDT {query.get("amount")}
                        </Typography>
                      </div>

                      <div className="form-group" style={{ marginTop: "10px" }}>
                        <Typography
                          sx={{
                            textAlign: "start",
                            marginTop: "15px",
                            color: "black",
                            fontWeight: "800",
                          }}
                        >
                          Transaction Hash{" "}
                        </Typography>
                        <input
                          style={{ width: "100%" }}
                          type="text"
                          name="transactionhash"
                          className="input-text"
                          placeholder="Transaction Hash"
                          onChange={(e) => setTransactionhash(e.target.value)}
                          value={transactionHash}
                        />
                      </div>

                      <button
                        onClick={() => handleUpload(current)}
                        style={{ background: "orange" }}
                        className="btn-md button-theme btn-block"
                        disabled={depositing}
                      >
                        {depositing ? (
                          <CircularProgress size={20} sx={{ color: "white" }} />
                        ) : (
                          "Upload Transaction Hash"
                        )}
                      </button>
                      <div>
                        -----------------------OR-----------------------
                      </div>
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
                      {!image && (
                        <button
                          onClick={() => handleScreenshot()}
                          className="btn-md  btn-block"
                          style={{ color: "black" }}
                        >
                          Click to upload screenshot{" "}
                        </button>
                      )}
                      {image && (
                        <button
                          onClick={() => handleUploadScreendhot(image, current)}
                          className="btn-md  btn-block"
                          style={{
                            color: "white",
                            marginTop: "10px",
                            background: "orange",
                          }}
                        >
                          Upload Screnshot{" "}
                        </button>
                      )}

                      <input
                        type="file"
                        id="screenshot"
                        style={{ display: "none" }}
                        onChange={async (e) => {
                          const file = e.target?.files;
                          if (file) {
                            try {
                              const { data } = await axios.post(
                                "/api/cloudinaryupload/profile",
                                file
                              );
                              console.log(data);
                              setImage(data?.photosArray[0].url);
                            } catch (error) {
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
                      />

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
};

export default function Home() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <TopUp />
    </Suspense>
  );
}
