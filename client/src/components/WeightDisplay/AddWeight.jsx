import { useState } from "react";

import {
  TextField,
  Box,
  InputAdornment,
  Button
} from "@mui/material";


import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


export default function AddWeight(props) {
  const { setWeightData, setFixedData } = props;

  const [weightInput, setWeightInput] = useState("");
  const [weightInputDate, setWeightInputDate] = useState(new Date());


    const addData = (data) => {
      const [day, month, year] = weightInputDate.toLocaleDateString().split("/");
      const selectedInputDate = new Date(year, month - 1, day);
      selectedInputDate.setHours(0, 0, 0);
      setWeightData((prev) =>
        [...prev, { x: selectedInputDate, y: data }].sort((a, b) => {
          console.log(prev)
          return new Date(b.x) - new Date(a.x);
        })
      );
      setFixedData((prev) =>
        [...prev, { x: selectedInputDate, y: data }].sort((a, b) => {
          return new Date(b.x) - new Date(a.x);
        })
      );
      setWeightInput("");
    };
  

  return (
    <Box
        display={"flex"}
        flexDirection={"columns"}
        alignContent={"center"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            openTo="day"
            views={["year", "month", "day"]}
            label="Date"
            value={weightInputDate}
            onChange={(newValue) => {
              console.log(newValue);
              setWeightInputDate(newValue["$d"]);
            }}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />
        </LocalizationProvider>
        <TextField
          label="Weight"
          id="outlined-start-adornment"
          sx={{ m: 1, width: "25ch" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">kg</InputAdornment>
            ),
          }}
          value={weightInput}
          onChange={(e) => {
            e.preventDefault();
            setWeightInput(e.target.value);
          }}
        />
        <Button
          type="submit"
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            if (Number(weightInput)) {
              addData(Number(weightInput));
            }
          }}
        >
          Add Weight
        </Button>
      </Box>
  )
}