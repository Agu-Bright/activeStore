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
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";

import "swiper/css";
import TableList from "./Table";

import React from "react";
import Image from "next/image";

const Topic = ({ title, src }) => {
  return (
    <div>
      <Image src={src} alt="img" width={30} height={30} />
      <span style={{ marginLeft: "10px" }}>{title}</span>
    </div>
  );
};

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
        className="contact-section overview-bgi"
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // background: "#EC5766",
        }}
      >
        <CircularProgress style={{ color: "white" }} />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/user/login");
  } else
    return (
      <NavPage>
        <Box sx={{ width: "100%", height: "100vh" }}>
          <Stack direction="row" justifyContent="space-between">
            <h2 style={{ fontSize: "1em" }}>
              <span style={{ color: "#8075ff", fontWeight: "800" }}>
                Welcome!!{" "}
              </span>
              <span style={{}}>{session?.user?.username}</span> 😇
            </h2>
            <h2 style={{ fontSize: "1em" }}>
              <span style={{ fontWeight: "800", paddingRight: "10px" }}>
                Balance:
              </span>
              <span style={{ textDecoration: "underline", cursor: "pointer" }}>
                0.00 USD
              </span>
            </h2>
          </Stack>
          <h1
            style={{
              textAlign: "center",
              fontWeight: "800",
              fontSize: "3em",
              background:
                "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Buy social accounts and channels
          </h1>
          <h6 style={{ textAlign: "center" }}>
            Leading marketplace to buy established Tiktok accounts, Youtube
            channels, Theme pages etc.
          </h6>

          <Box
            sx={{
              height: "30vh",
              border: "1px solid #e6dede",
              width: "100%",
              marginBottom: "20px",
            }}
          ></Box>
          <TableList title={<Topic title="Popular" src="/img/star.png" />} />
          <TableList
            title={<Topic title="Facebook" src="/img/facebook-1.png" />}
          />
          <TableList title={<Topic title="Twitter" src="/img/twitter.png" />} />
          <TableList
            title={<Topic title="Instagram" src="/img/instagram.png" />}
          />
          <TableList title={<Topic title="Email" src="/img/gmail.png" />} />
          <TableList title={<Topic title="Others" src="/img/star.png" />} />
        </Box>
      </NavPage>
    );
}
