import React, { useContext, useEffect, useState } from "react";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Box, Stack } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { RestaurantContext } from "@context/RestaurantContext";

const Details = ({ category }) => {
  const [logs, setLogs] = useState("");
  const { setOpen, setType } = useContext(RestaurantContext);
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
  }, []);
  return (
    <AccordionDetails>
      <Stack direction={{ md: "row", xs: "column" }}>
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
      </Stack>
    </AccordionDetails>
  );
};

export default Details;
