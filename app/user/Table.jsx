import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Divider, Stack } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LocalMallIcon from "@mui/icons-material/LocalMall";

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

export default function TableList({ title }) {
  const router = useRouter();
  return (
    <>
      <div style={{ marginTop: "15px" }}>
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
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Image
                      src="/img/facebook.png"
                      height={30}
                      width={40}
                      style={{ marginRight: "10px" }}
                    />
                    {row.name}
                  </TableCell>

                  <TableCell>{row.calories}</TableCell>
                  <TableCell>10</TableCell>
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
