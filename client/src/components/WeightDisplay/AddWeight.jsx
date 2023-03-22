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
  const { setWeightData, setFixedData, weightData, apiServerUrl } = props;

  const [weightInput, setWeightInput] = useState("");
  const [weightInputDate, setWeightInputDate] = useState(new Date());
  const [weightExists, setWeightExists] = useState(false);

const postWeightData = async (userId, inputDate, inputWeight) => {
  console.log("input date", inputDate);
  const [day, month, year] = inputDate.toLocaleDateString().split('/')
  const inputDateCleaned = `${year}-${month}-${day}`
  const res = await fetch(`${apiServerUrl}/api/users/${userId}/weight`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({inputDate: inputDateCleaned,inputWeight})
  });
  console.log("res", res)
  return res
}

const addData = async (data) => {
  const [day, month, year] = weightInputDate.toLocaleDateString().split("/");
  const selectedInputDate = new Date(year, month - 1, day);
  selectedInputDate.setHours(0, 0, 0);
  const found =  weightData.some(data =>
    data.x.getDate() === selectedInputDate.getDate() && 
    data.x.getDay() === selectedInputDate.getDay() &&
    data.x.getFullYear() === selectedInputDate.getFullYear()
    )

  if (!found) {
    await postWeightData(1, selectedInputDate, data);
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
  } else {
    setWeightExists(true)
  }
}
;
  

  return (
    <Box
        display={"flex"}
        flexDirection={"columns"}
        alignContent={"center"}
        justifyContent={"center"}
        alignItems={"baseline"}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            openTo="day"
            views={["year", "month", "day"]}
            label="Date"
            value={weightInputDate}
            onChange={(newValue) => {
              setWeightInputDate(newValue["$d"]);
            }}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />
        </LocalizationProvider>
        <TextField
        // handle error
          error={weightExists}
          helperText={weightExists ? 'Weight already given for this date' : ' '}
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
            if (e.target.value === "") {
              setWeightExists(false)
            }
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