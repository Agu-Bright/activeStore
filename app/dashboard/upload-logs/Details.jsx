import React, { useContext, useEffect, useState } from "react";
import AccordionDetails from "@mui/material/AccordionDetails";
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { RestaurantContext } from "@context/RestaurantContext";

const Details = ({ category }) => {
  const [logs, setLogs] = useState("");
  const { setOpen, setType, setCatType, toggle } =
    useContext(RestaurantContext);
  useEffect(() => {
    //fetch logs for this category
    (async () => {
      try {
        const { data } = await axios.post("/api/logs/get-category-logs", {
          category,
        });
        setLogs(data?.logs);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [toggle]);
  return (
    <AccordionDetails>
      <Stack direction={{ xs: "column" }}>
        {logs && logs.length === 0 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div>
              <Image src="/img/creativity.png" width={100} height={100} />
            </div>
            <h5 style={{ fontWeight: "200", marginTop: "10px" }}>
              Create a log for this category
            </h5>
            <button
              onClick={() => {
                setType("createLog");
                setCatType(category);
                setOpen(true);
              }}
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
            >
              Create Log{" "}
            </button>
          </div>
        )}
        <div style={{ width: "100%" }}>
          {logs &&
            logs.length > 0 &&
            logs.map((log, _index) => (
              <Paper
                key={_index}
                sx={{
                  width: "100%",
                  padding: "15px 10px",
                  cursor: "pointer",
                  display: "flex",
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, #efeff4 0%, #e8e7f2 35%, #d3e5e8 100%)",
                }}
              >
                <Box
                  sx={{
                    border: "2px solid white",
                    padding: "10px",
                    width: "100%",
                    borderRadius: "5px",
                    display: "flex",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ width: "100%" }}
                  >
                    <Box
                      sx={{
                        width: "70%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start",
                      }}
                    >
                      <Box>
                        <Avatar
                          src={`/img/${log?.social}.png`}
                          sx={{ borderRadius: "2px", marginRight: "15px" }}
                        />
                      </Box>
                      <Typography
                        sx={{
                          fontWeight: "800",
                          fontSize: "1.5em",
                          marginRight: "15px",
                        }}
                      >
                        {log.social}
                      </Typography>
                      <Typography>{log.description}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography>
                        <span style={{ fontWeight: "800" }}>Stock:</span>
                        <span>{log?.logs.length}</span>
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Paper>
            ))}
        </div>
      </Stack>
    </AccordionDetails>
  );
};

export default Details;
