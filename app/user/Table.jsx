import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Button, Divider, Stack } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import axios from "axios";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("UK used facebook", 6000, 6.0),
  createData("Instagram", 237, 9.0),
  createData("Twitter", 262, 16.0),
  createData("Gmail", 305, 3.7),
  createData("Tiktok", 356, 16.0),
];

console.log("activeRow", rows);

export default function TableList({ title, key, category }) {
  const router = useRouter();
  const [logs, setLogs] = React.useState([]);

  // const [rows, setRows] = React.useState([]);

  const handleCreateRows = (logs) => {
    const array = logs.map((log) => {
      createData(
        log?.description + ":" + log?.image,
        log?.price,
        log?.logs.length
      );
    });
    console.log("rows", array);
    // setRows(rows);
  };

  React.useEffect(() => {
    (async () => {
      try {
        //fetch logs based on category
        const { data } = await axios.post("/api/logs/get-category-logs", {
          category,
        });
        console.log(data);
        setLogs(data?.logs);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <div key={key} style={{ marginTop: "15px" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ marginBottom: "10px" }}
        >
          <h4 style={{ fontWeight: "800" }}>{title}</h4>

          <div
            style={{ cursor: "pointer" }}
            onClick={() => router.push(`/user/products?cat=${title}`)}
          >
            <span style={{ fontWeight: "800", marginRight: "10px" }}>
              {" "}
              See More
            </span>
            <Image src="/img/right-arrow-1.png" height={30} width={40} />
          </div>
        </Stack>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                      sx={{ display: "flex" }}
                    >
                      <Avatar
                        src={
                          log?.image ? log?.image : `/img/${log?.social}.png`
                        }
                        sx={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "1px",
                          marginRight: "10px",
                        }}
                        // height={30}
                        // width={40}
                        // style={{ marginRight: "10px" }}
                      />
                      <div>{log?.description}</div>
                    </TableCell>

                    <TableCell>{log?.price}</TableCell>
                    <TableCell>{log?.logs.length}</TableCell>
                    {/* <TableCell>{row.fat}</TableCell> */}

                    <TableCell sx={{ textAlign: "end" }}>
                      <Button
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
      <Divider sx={{ margin: "20px 0px", visibility: "hidden" }} />
    </>
  );
}
