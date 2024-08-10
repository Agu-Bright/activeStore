"use client";
import LiveChatScript from "@components/LiveChat";
import NavPage from "@components/navPage/NavPage";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  Grid,
  Paper,
  IconButton,
  Avatar,
  useMediaQuery,
  Button,
} from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Suspense, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RestaurantContext } from "@context/RestaurantContext";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const Product = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const query = useSearchParams();
  console.log("query", query);
  const cat = query.get("cat");
  console.log("cat", cat);
  const [logs, setLogs] = useState([]);

  const isMobile = useMediaQuery("(max-width:600px)");
  const { open, setOpen, activeLog, setActiveLog, formatMoney } =
    useContext(RestaurantContext);
  useEffect(() => {
    cat &&
      (async () => {
        try {
          //fetch logs based on category
          const { data } = await axios.post("/api/logs/get-category-logs", {
            category: cat,
          });
          console.log(data);
          setLogs(data?.logs);
        } catch (error) {
          console.log(error);
        }
      })();
  }, [cat]);

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
          //   background: "#EC5766",
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
        <div>
          <Typography>{cat}</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "0px" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell sx={{ textAlign: "end" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.length > 0 &&
                  logs.map((log) => (
                    <TableRow
                      key={log?._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          display: "flex",
                          flexDirection: isMobile ? "column" : "row",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          src={
                            log?.image ? log?.image : `/img/${log?.social}.png`
                          }
                          sx={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "1px",
                            marginRight: isMobile ? "0" : "10px",
                            marginBottom: isMobile ? "10px" : "0",
                          }}
                          // height={30}
                          // width={40}
                          // style={{ marginRight: "10px" }}
                        />
                        <div>{log?.description}</div>
                      </TableCell>

                      <TableCell>{formatMoney(log?.price)}</TableCell>
                      <TableCell>{log?.logs.length}</TableCell>
                      {/* <TableCell>{row.fat}</TableCell> */}

                      <TableCell sx={{ textAlign: isMobile ? "start" : "end" }}>
                        <Button
                          onClick={() => {
                            setActiveLog(log);
                            console.log("hii");
                            setOpen(true);
                          }}
                          variant="outlined"
                          sx={{ background: "primary" }}
                          startIcon={<LocalMallIcon />}
                        >
                          Buy
                        </Button>
                      </TableCell>
                      {/* <TableCell>{row.protein}</TableCell> */}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </NavPage>
    );
};

export default function Home() {
  return (
    <Suspense fallback={<div>loading ...</div>}>
      <Product />
    </Suspense>
  );
}
