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
  Stack,
  Typography,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import Call from "@components/CallModal";
import { RestaurantContext } from "@context/RestaurantContext";
export default function Home() {
  const { data: session, status } = useSession();
  const { open, setOpen, handleOpen, myWallet, totalP } =
    useContext(RestaurantContext);
  const router = useRouter();

  const [secondary, setSecondary] = useState(false);

  const handleCopy = () => {
    const referralCode = session?.user?.referalCode;
    if (referralCode) {
      navigator.clipboard
        .writeText(referralCode)
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
  const [chatVisible, setChatVisible] = useState(false);

  const toggleChat = () => {
    if (typeof window !== "undefined" && window.LiveChatWidget) {
      if (chatVisible) {
        window.LiveChatWidget.call("hide");
      } else {
        window.LiveChatWidget.call("maximize");
      }
      setChatVisible(!chatVisible);
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
      <>
        <NavPage>
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
                          marginTop: "50px",
                          marginBottom: "60px",
                        }}
                      >
                        <Box sx={{ display: "flex" }}>
                          <Avatar
                            sx={{ width: "100px", height: "100px" }}
                            src={`${
                              session?.user?.sex === "male"
                                ? "/img/man.png"
                                : "/img/woman.png"
                            }`}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "start",
                              justifyContent: "center",
                              marginLeft: "17px",
                            }}
                          >
                            <h3
                              style={{
                                fontWeight: "800",
                              }}
                            >
                              {session?.user?.accountName}
                            </h3>
                            <button
                              style={{
                                border: "none",
                                background: "green",
                                color: "white",
                                borderRadius: "5px",
                              }}
                            >
                              {session?.user?.badge} member
                            </button>
                          </div>
                        </Box>
                        <Box
                          sx={{
                            border: "1px solid #ede9e9",
                            marginTop: "15px",
                            borderRadius: "5px",
                            padding: "10px 5px",
                          }}
                        >
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            sx={{ marginTop: "20px" }}
                          >
                            <Typography>Referral Code</Typography>
                            <div>
                              <span>{session?.user?.referalCode}</span>
                              <IconButton onClick={() => handleCopy()}>
                                <ContentCopyIcon />
                              </IconButton>
                            </div>
                          </Stack>

                          <Stack
                            direction="row"
                            justifyContent="space-around"
                            sx={{ marginTop: "20px" }}
                          >
                            <Box>
                              <Typography sx={{ fontWeight: "800" }}>
                                USD {myWallet?.profit || 0}.00
                              </Typography>
                              <Typography>Today's Commision</Typography>
                            </Box>
                            <Box>
                              <Typography sx={{ fontWeight: "800" }}>
                                USD {myWallet?.balance}.00
                              </Typography>
                              <Typography>Account Balance </Typography>
                            </Box>
                          </Stack>
                        </Box>

                        {/* =============================================faq========================== */}
                        <Stack
                          direction="row"
                          justifyContent="space-around"
                          sx={{ marginTop: "15px", cursor: "pointer" }}
                        >
                          <Stack
                            direction="column"
                            alignItems="center"
                            onClick={() => router.push("/user/tnc")}
                          >
                            <Avatar
                              sx={{
                                borderRadius: "0px",
                                width: "30px",
                                height: "30px",
                              }}
                              src="/img/auction.png"
                              alt="tc"
                            />
                            <Typography>T & C</Typography>
                          </Stack>
                          <Stack
                            direction="column"
                            alignItems="center"
                            onClick={() => router.push("/user/faq")}
                          >
                            <Avatar
                              sx={{
                                borderRadius: "0px",
                                width: "30px",
                                height: "30px",
                              }}
                              src="/img/question.png"
                              alt="tc"
                            />
                            <Typography>General FAQs</Typography>
                          </Stack>
                          <Stack
                            direction="column"
                            alignItems="center"
                            onClick={() => router.push("/user/about")}
                          >
                            <Avatar
                              sx={{
                                borderRadius: "0px",
                                width: "30px",
                                height: "30px",
                              }}
                              src="/img/file.png"
                              alt="tc"
                            />
                            <Typography>About Us</Typography>
                          </Stack>
                        </Stack>

                        {/* ============================================list============================================= */}
                        <List
                          style={{
                            marginTop: "15px",
                            borderTop: "1px solid #ede9e9",
                            borderRadius: "5px",
                          }}
                        >
                          <ListItem
                            onClick={() => router.push("/user/profile-manage")}
                            sx={{ cursor: "pointer" }}
                            secondaryAction={
                              <IconButton edge="end" aria-label="delete">
                                <ArrowForwardIosIcon />
                              </IconButton>
                            }
                          >
                            <ListItemAvatar>
                              <Avatar
                                src={`${
                                  session?.user?.sex === "male"
                                    ? "/img/man.png"
                                    : "/img/woman.png"
                                }`}
                                alt="profile"
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary="profile"
                              secondary={secondary ? "Secondary text" : null}
                            />
                          </ListItem>
                          <Divider />

                          <ListItem
                            onClick={() => router.push("/user/all-record")}
                            sx={{ cursor: "pointer" }}
                            secondaryAction={
                              <IconButton edge="end" aria-label="delete">
                                <ArrowForwardIosIcon />
                              </IconButton>
                            }
                          >
                            <ListItemAvatar>
                              <Avatar
                                sx={{ borderRadius: "0px" }}
                                src="/img/edit.png"
                                alt="profile"
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary="All Records"
                              secondary={secondary ? "Secondary text" : null}
                            />
                          </ListItem>
                          <Divider />

                          <ListItem
                            onClick={() => router.push("/user/withdrawal")}
                            sx={{ cursor: "pointer" }}
                            secondaryAction={
                              <IconButton edge="end" aria-label="delete">
                                <ArrowForwardIosIcon />
                              </IconButton>
                            }
                          >
                            <ListItemAvatar>
                              <Avatar
                                sx={{ borderRadius: "0px" }}
                                src="/img/credit-card.png"
                                alt="profile"
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary="Withdrawal"
                              secondary={secondary ? "Secondary text" : null}
                            />
                          </ListItem>
                          <Divider />

                          <ListItem
                            onClick={() => router.push("/user/deposite")}
                            sx={{ cursor: "pointer" }}
                            secondaryAction={
                              <IconButton edge="end" aria-label="delete">
                                <ArrowForwardIosIcon />
                              </IconButton>
                            }
                          >
                            <ListItemAvatar>
                              <Avatar
                                style={{ borderRadius: "0px" }}
                                src="/img/deposit.png"
                                alt="profile"
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary="Deposite"
                              secondary={secondary ? "Secondary text" : null}
                            />
                          </ListItem>
                          <Divider />

                          <ListItem
                            onClick={() => router.push("/user/security")}
                            sx={{ cursor: "pointer" }}
                            secondaryAction={
                              <IconButton edge="end" aria-label="delete">
                                <ArrowForwardIosIcon />
                              </IconButton>
                            }
                          >
                            <ListItemAvatar>
                              <Avatar
                                style={{ borderRadius: "0px" }}
                                src="/img/cyber-security.png"
                                alt="profile"
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary="Security"
                              secondary={secondary ? "Secondary text" : null}
                            />
                          </ListItem>
                          <Divider />

                          <ListItem
                            onClick={() => toggleChat()}
                            sx={{ cursor: "pointer" }}
                            secondaryAction={
                              <IconButton edge="end" aria-label="delete">
                                <ArrowForwardIosIcon />
                              </IconButton>
                            }
                          >
                            <ListItemAvatar>
                              <Avatar
                                style={{ borderRadius: "0px" }}
                                src="/img/phone.png"
                                alt="profile"
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary="Contact"
                              secondary={secondary ? "Secondary text" : null}
                            />
                          </ListItem>
                          <Divider />

                          <ListItem
                            onClick={() => router.push("/user/bind-wallet")}
                            sx={{ cursor: "pointer" }}
                            secondaryAction={
                              <IconButton edge="end" aria-label="delete">
                                <ArrowForwardIosIcon />
                              </IconButton>
                            }
                          >
                            <ListItemAvatar>
                              <Avatar
                                style={{ borderRadius: "0px" }}
                                src="/img/wallet.png"
                                alt="profile"
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary="Bind Wallet Address"
                              secondary={secondary ? "Secondary text" : null}
                            />
                          </ListItem>
                          <Divider />

                          <ListItem
                            sx={{ cursor: "pointer" }}
                            secondaryAction={
                              <IconButton edge="end" aria-label="delete">
                                <ArrowForwardIosIcon />
                              </IconButton>
                            }
                          >
                            <ListItemAvatar>
                              <Avatar
                                style={{ borderRadius: "0px" }}
                                src="/img/languages.png"
                                alt="profile"
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary="Language"
                              secondary={secondary ? "Secondary text" : null}
                            />
                          </ListItem>
                          <Divider />

                          <ListItem
                            onClick={() => {
                              signOut();
                              router.push("/user/login");
                            }}
                            sx={{ cursor: "pointer" }}
                            secondaryAction={
                              <IconButton edge="end" aria-label="delete">
                                <ArrowForwardIosIcon />
                              </IconButton>
                            }
                          >
                            <ListItemAvatar>
                              <Avatar
                                style={{ borderRadius: "0px" }}
                                src="/img/logout.png"
                                alt="profile"
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary="Logout"
                              secondary={secondary ? "Secondary text" : null}
                            />
                          </ListItem>
                          <Divider />
                        </List>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
          <Call open={open} setOpen={setOpen} />
        </NavPage>
      </>
      // <NoSSRComponent>
    );
}
