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
} from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [active, setActive] = useState("popular");
  const [movies, setMovies] = useState();

  const getRandomMovies = (movies, count) => {
    const shuffled = movies.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const TMDB_API_KEY = " d70595ef3e351a97e5665f2de45fcd45";
    const TMDB_ACCESS_TOKEN =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzA1OTVlZjNlMzUxYTk3ZTU2NjVmMmRlNDVmY2Q0NSIsInN1YiI6IjY2NzA0MWQ0ODRmMDE5YTBlYWExYjcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-M4AqRw0LtobEQ4YQ-eAxJxaSz8ym__7cLqyry-7Uvk";
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${active}`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
            },
            params: {
              api_key: TMDB_API_KEY,
              // sort_by: "popularity.desc", // You can modify this to fetch movies based on different criteria
              page: 1, // Fetch the first page of results
            },
          }
        );

        const randomMovies = getRandomMovies(data?.results, 12);
        const movieData = randomMovies.map((movie) => ({
          name: movie.title,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          rating: movie.vote_average,
        }));
        setMovies(movieData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [active]);

  const [bronzV, setBronzV] = useState(true);
  const [silverV, setSilverV] = useState(true);
  const [goldV, setGoldV] = useState(true);
  const [diamondV, setDiamondV] = useState(true);

  const handleToggle = (type) => {
    if (type === "bronze") {
      setBronzV((prev) => !prev);
      return;
    }
    if (type === "silver") {
      setSilverV((prev) => !prev);
      return;
    }
    if (type === "gold") {
      setGoldV((prev) => !prev);
      return;
    }
    if (type === "diamond") {
      setDiamondV((prev) => !prev);
      return;
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
        <div
          className="contact-section overview-bgi"
          style={{ height: "95%", overflow: "hidden", color: "white" }}
        >
          {/* <div>welcome {session?.user?.accountName}</div> */}

          <div
            className="container"
            style={{
              zIndex: "999",
              width: "100%",
              height: "100%",
              marginTop: "90px",
            }}
          >
            <div
              className="details"
              style={{
                height: "100vh",
                overflowY: "scroll",
                marginTop: "70px",
                marginBottom: "70px",
              }}
            >
              <div
                style={{
                  maxWidth: "100%",
                  marginBottom: "150px",
                }}
              >
                <video
                  // autoPlay
                  controls
                  // loop
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ maxHeight: "50vh", width: "100%" }}
                >
                  <source src="/videos/badboys.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div class="marquee">
                  <p>
                    For each deposit, you have to click on the customer service
                    link in the platform to receive the merchant's deposit
                    account, and the customer service will serve you in time.
                  </p>
                </div>
                <Stack direction="row" justifyContent="space-around">
                  <Typography
                    onClick={() => setActive("popular")}
                    sx={{
                      borderBottom: `${
                        active === "popular" ? "1px solid red" : "none"
                      }`,
                      fontWeight: "800",
                      fontSize: "1.2em",
                      cursor: "pointer",
                    }}
                  >
                    Popular
                  </Typography>
                  <Typography
                    onClick={() => setActive("now_playing")}
                    sx={{
                      borderBottom: `${
                        active === "now_playing" ? "1px solid red" : "none"
                      }`,
                      fontWeight: "800",
                      fontSize: "1.2em",
                      cursor: "pointer",
                    }}
                  >
                    Todays showing
                  </Typography>
                  <Typography
                    onClick={() => setActive("upcoming")}
                    sx={{
                      borderBottom: `${
                        active === "upcoming" ? "1px solid red" : "none"
                      }`,
                      fontWeight: "800",
                      fontSize: "1.2em",
                      cursor: "pointer",
                    }}
                  >
                    On-going
                  </Typography>
                </Stack>
                {/* <Stack>
                  <Box></Box>
                </Stack> */}
                {/* <Typography>hiskdj skdj sfk sd</Typography> */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "90%",
                      marginTop: "20px",
                      marginBottom: "50px",
                    }}
                  >
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      {movies &&
                        movies.map((item, index) => (
                          <Grid item key={index} xs={6} md={4}>
                            <div>
                              <img
                                className="movie_image"
                                src={item.image}
                                alt={item.name}
                              />
                              <Typography
                                sx={{ fontWeight: "800", color: "white" }}
                              >
                                {item.name}
                              </Typography>
                              <p>Rating: {item.rating}</p>
                            </div>
                          </Grid>
                        ))}
                    </Grid>
                    <Typography
                      sx={{
                        color: "white",
                        textAlign: "start",
                        fontWeight: "800",
                      }}
                    >
                      VIP Levels
                    </Typography>

                    <Grid
                      sx={{ marginTop: "20px" }}
                      container
                      rowSpacing={6}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Grid item md={6} xs={12}>
                        <Paper
                          onClick={() => handleToggle("bronze")}
                          sx={{
                            padding: "20px 5px",
                            position: "relative",
                            borderRadius: "10px",
                            cursor: "pointer",
                            // height: "300px",
                          }}
                        >
                          {bronzV && (
                            <>
                              <Typography
                                sx={{
                                  fontWeight: "900",
                                  fontSize: "1.2em",
                                  color: "#030361",
                                }}
                              >
                                Bronze Member
                              </Typography>
                              <div
                                style={{
                                  padding: "5px",
                                  position: "absolute",
                                  top: -35,
                                  left: 50,
                                  right: 50,
                                }}
                              >
                                <IconButton sx={{ opacity: 0.4 }}>
                                  <Avatar
                                    sx={{ borderRadius: "0px" }}
                                    src="/img/bronze-medal.png"
                                    alt="profile"
                                  />{" "}
                                </IconButton>
                              </div>
                            </>
                          )}

                          {!bronzV && (
                            <>
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                sx={{ minHeight: "150px" }}
                              >
                                <Box>
                                  <IconButton sx={{ opacity: 0.4 }}>
                                    <Avatar
                                      sx={{ borderRadius: "0px" }}
                                      src="/img/bronze-medal.png"
                                      alt="profile"
                                    />{" "}
                                  </IconButton>
                                  <Typography
                                    sx={{
                                      fontWeight: "900",
                                      fontSize: "1.2em",
                                      color: "#030361",
                                    }}
                                  >
                                    Bronze Member
                                  </Typography>
                                </Box>
                                <Box sx={{ padding: "10px 10px" }}>
                                  <Typography
                                    sx={{
                                      textAlign: "start",
                                      color: "white",
                                      background: "black",
                                      borderRadius: "7px",
                                      width: "fit-content",
                                      padding: "5px",
                                    }}
                                  >
                                    Upgrade Now
                                  </Typography>
                                  <Box>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      Minimum Deposit amount: USD20.00
                                    </Typography>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      Minimum Wallet amount start: USD20.00
                                    </Typography>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      Per task commission: 20%{" "}
                                    </Typography>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      25 tasks completed/day{" "}
                                    </Typography>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      Withdrawal fee: 0.00%{" "}
                                    </Typography>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      Minimum Withdrawal Amount: 20{" "}
                                    </Typography>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      Maximum Withdrawal Amount: 100, 000.00{" "}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Stack>
                            </>
                          )}
                        </Paper>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <Paper
                          onClick={() => handleToggle("silver")}
                          sx={{
                            padding: "20px 5px",
                            position: "relative",
                            borderRadius: "10px",
                            cursor: "pointer",
                            boxShadow: "1px 1px 1px 5px #030361",
                          }}
                        >
                          {silverV && (
                            <>
                              {" "}
                              <Typography
                                sx={{
                                  fontWeight: "900",
                                  fontSize: "1.2em",
                                  color: "#030361",
                                }}
                              >
                                Silver Member
                              </Typography>
                              <div
                                style={{
                                  position: "absolute",
                                  top: -35,
                                  left: 50,
                                  right: 50,
                                }}
                              >
                                <IconButton
                                  sx={{
                                    opacity: 1,
                                  }}
                                >
                                  <Avatar
                                    sx={{ borderRadius: "0px" }}
                                    src="/img/silver-medal.png"
                                    alt="profile"
                                  />{" "}
                                </IconButton>
                              </div>
                            </>
                          )}
                          {!silverV && (
                            <>
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                sx={{ minHeight: "150px" }}
                              >
                                <Box>
                                  <IconButton sx={{ opacity: 0.4 }}>
                                    <Avatar
                                      sx={{ borderRadius: "0px" }}
                                      src="/img/silver-medal.png"
                                      alt="profile"
                                    />{" "}
                                  </IconButton>
                                  <Typography
                                    sx={{
                                      fontWeight: "900",
                                      fontSize: "1.2em",
                                      color: "#030361",
                                    }}
                                  >
                                    Silver Member
                                  </Typography>
                                </Box>
                                <Box sx={{ padding: "10px 10px" }}>
                                  <Typography
                                    sx={{
                                      textAlign: "start",
                                      color: "black",
                                      borderRadius: "50px",
                                      border: "0.1px solid gray",
                                      width: "fit-content",
                                      padding: "5px",
                                    }}
                                  >
                                    current
                                  </Typography>
                                  <Box>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      Minimum Deposit amount: USD 500.00
                                    </Typography>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      Minimum Wallet amount start: USD 500.00
                                    </Typography>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      Per task commission: 4.00%{" "}
                                    </Typography>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      25 tasks completed/day{" "}
                                    </Typography>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      Withdrawal fee: 0.00%{" "}
                                    </Typography>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      Minimum Withdrawal Amount: 20{" "}
                                    </Typography>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      Maximum Withdrawal Amount: 9, 999, 990.00{" "}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Stack>
                            </>
                          )}
                        </Paper>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <Paper
                          onClick={() => handleToggle("gold")}
                          sx={{
                            padding: "20px 5px",
                            position: "relative",
                            borderRadius: "10px",
                            cursor: "pointer",
                          }}
                        >
                          {" "}
                          {goldV && (
                            <>
                              <Typography
                                sx={{
                                  fontWeight: "900",
                                  fontSize: "1.2em",
                                  color: "#030361",
                                }}
                              >
                                Gold Member
                              </Typography>
                              <div
                                style={{
                                  position: "absolute",
                                  top: -35,
                                  left: 50,
                                  right: 50,
                                }}
                              >
                                <IconButton sx={{ opacity: 0.4 }}>
                                  <Avatar
                                    sx={{ borderRadius: "0px" }}
                                    src="/img/winner.png"
                                    alt="profile"
                                  />{" "}
                                </IconButton>
                              </div>
                            </>
                          )}
                          {!goldV && (
                            <>
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                sx={{ minHeight: "150px" }}
                              >
                                <Box>
                                  <IconButton sx={{ opacity: 0.4 }}>
                                    <Avatar
                                      sx={{ borderRadius: "0px" }}
                                      src="/img/winner.png"
                                      alt="profile"
                                    />{" "}
                                  </IconButton>
                                  <Typography
                                    sx={{
                                      fontWeight: "900",
                                      fontSize: "1.2em",
                                      color: "#030361",
                                    }}
                                  >
                                    Gold Member
                                  </Typography>
                                </Box>
                                <Box sx={{ padding: "10px 10px" }}>
                                  <Typography
                                    sx={{
                                      textAlign: "start",
                                      color: "white",
                                      background: "black",
                                      borderRadius: "7px",
                                      width: "fit-content",
                                      padding: "5px",
                                    }}
                                  >
                                    Upgrade Now
                                  </Typography>
                                  <Box>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      Minimum Deposit amount: USD 3,000.00
                                    </Typography>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      Minimum Wallet amount start: USD 2,000.00
                                    </Typography>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      Per task commission: 6.00%{" "}
                                    </Typography>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      25 tasks completed/day{" "}
                                    </Typography>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      Withdrawal fee: 0.00%{" "}
                                    </Typography>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      Minimum Withdrawal Amount: 20{" "}
                                    </Typography>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      Maximum Withdrawal Amount: 99,999,999.00{" "}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Stack>
                            </>
                          )}
                        </Paper>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <Paper
                          onClick={() => handleToggle("diamond")}
                          sx={{
                            padding: "20px 0px",
                            position: "relative",
                            borderRadius: "10px",
                            cursor: "pointer",
                          }}
                        >
                          {" "}
                          {diamondV && (
                            <>
                              <Typography
                                sx={{
                                  fontWeight: "900",
                                  fontSize: "1.2em",
                                  color: "#030361",
                                }}
                              >
                                Diamond Member
                              </Typography>
                              <div
                                style={{
                                  position: "absolute",
                                  top: -35,
                                  left: 50,
                                  right: 50,
                                }}
                              >
                                <IconButton sx={{ opacity: 0.4 }}>
                                  <Avatar
                                    sx={{ borderRadius: "0px" }}
                                    src="/img/premium-quality.png"
                                    alt="profile"
                                  />{" "}
                                </IconButton>
                              </div>
                            </>
                          )}
                          {!diamondV && (
                            <>
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                sx={{ minHeight: "150px" }}
                              >
                                <Box>
                                  <IconButton sx={{ opacity: 0.4 }}>
                                    <Avatar
                                      sx={{ borderRadius: "0px" }}
                                      src="/img/premium-quality.png"
                                      alt="profile"
                                    />{" "}
                                  </IconButton>
                                  <Typography
                                    sx={{
                                      fontWeight: "900",
                                      fontSize: "1.2em",
                                      color: "#030361",
                                    }}
                                  >
                                    Diamond Member
                                  </Typography>
                                </Box>
                                <Box sx={{ padding: "10px 10px" }}>
                                  <Typography
                                    sx={{
                                      textAlign: "start",
                                      color: "white",
                                      background: "black",
                                      borderRadius: "7px",
                                      width: "fit-content",
                                      padding: "5px",
                                    }}
                                  >
                                    Upgrade Now
                                  </Typography>
                                  <Box>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      Minimum Deposit amount: USD 10,000.00
                                    </Typography>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      Minimum Wallet amount start: USD 9,000.00
                                    </Typography>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      Per task commission: 8.00%{" "}
                                    </Typography>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      25 tasks completed/day{" "}
                                    </Typography>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      Withdrawal fee: 0.00%{" "}
                                    </Typography>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      Minimum Withdrawal Amount: 20{" "}
                                    </Typography>
                                    <Typography sx={{ textAlign: "start" }}>
                                      {" "}
                                      Maximum Withdrawal Amount: 99,999,999.00{" "}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Stack>
                            </>
                          )}
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>
                </div>

                <p style={{ color: "white", zIndex: "999", marginTop: "30px" }}>
                  Copyright @2024 Com Score. All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <noscript>
          <a href="https://www.livechat.com/chat-with/18231096/" rel="nofollow">
            Chat with us
          </a>
          , powered by{" "}
          <a
            href="https://www.livechat.com/?welcome"
            rel="noopener nofollow"
            target="_blank"
          >
            LiveChat
          </a>
        </noscript> */}
        <LiveChatScript />
      </NavPage>
    );
}
