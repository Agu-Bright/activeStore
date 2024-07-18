import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Divider, Stack } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("FaceBook", 159, 6.0),
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
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
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
