import React, { useEffect, useState } from "react";
import useData from "../hooks/useData";
import ProgressSpinner from "../components/Spinner";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const Product = () => {
  const { category, loading } = useData();
  const [value, setValue] = useState([]);
  const [check, setCheck] = useState(false);
  const state = useSelector((state) => state.addItem);

  useEffect(() => {
    if (state?.length > 0) {
      const payload = [];
      state.forEach((val) => {
        category.forEach((v) => {
          if (val?.tags.includes(v.name)) {
            payload.push({ ...val, tags: v.name });
          }
        });
      });

      const payload1 = payload.reduce(function (r, a) {
        r[a.tags] = r[a.tags] || [];
        r[a.tags].push(a);
        return r;
      }, Object.create(null));

      const tablePayload = [];

      category.forEach((val) => {
        tablePayload.push({
          name: val.name,
          questionLen: payload1[val.name].length,
          votes: payload1[val.name].reduce((sum, { score }) => sum + score, 0),
          avgView: parseInt(
            payload1[val.name].reduce(
              (sum, { view_count }) => sum + view_count,
              0
            ) / payload1[val.name].length
          ),
        });
      });
      setValue(tablePayload);
    }
    // eslint-disable-next-line
  }, [loading]);

  return loading?.data && loading?.category ? (
    <div
      className="d-flex justify-content-center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <ProgressSpinner />
    </div>
  ) : (
    <div>
      <div className="container">
        {state?.length === 0 ? (
          <div className="row justify-content-around">
            No records available.
          </div>
        ) : (
          <div className="row justify-content-around">
            <div className="d-flex justify-content-center switch-container">
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Table Format</Typography>
                <AntSwitch
                  value={check}
                  inputProps={{ "aria-label": "ant design" }}
                  onChange={(e) => setCheck(e.target.checked)}
                />
                <Typography>Chart Format</Typography>
              </Stack>
            </div>
            {!check ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Tags</StyledTableCell>
                      <StyledTableCell align="right">
                        Total questions
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Total votes
                      </StyledTableCell>
                      <StyledTableCell align="right">Avg views</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {value.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.questionLen}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.votes}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.avgView}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <LineChart width={600} height={300} data={value}>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="votes" stroke="#8884d8" />
                <Line type="monotone" dataKey="avgView" stroke="#82ca9d" />
                <Line type="monotone" dataKey="questionLen" stroke="#82ca9d" />
                <XAxis dataKey="name" />
                <Tooltip />
                <YAxis />
              </LineChart>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
