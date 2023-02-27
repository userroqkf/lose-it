import { useState, useEffect } from "react";

import {
  TextField,
  Box,
  IconButton,
} from "@mui/material";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";



export default function WeightMonthSelector(props) {

  const {setValue} = props;

  const [dateSelected, setDateSelected] = useState(dayjs(new Date()));

  useEffect(() => {
    setValue(dateSelected["$d"])
  }, [dateSelected, setValue])


  const changeDate = (e) => {
    if (e.target.id === "add") {
      setDateSelected((date) => {
        console.log("clicked");
        const updatedDate = date.add(1, "month")
        return updatedDate;
      });
    } else if (e.target.id === "sub") {
      setDateSelected((date) => {
        const updatedDate =  date.add(-1, "month")
        return updatedDate;
      });
    }
  };

  return (
    <Box
        display={"flex"}
        flexDirection={"columns"}
        alignContent={"center"}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <IconButton>
          <NavigateBeforeIcon
            id="sub"
            onClick={(e) => {
              changeDate(e)
            }}
          />
        </IconButton>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            openTo="month"
            views={["year", "month"]}
            label="Year and Month"
            minDate={new Date("2012-03-01")}
            maxDate={new Date()}
            value={dateSelected}
            selected={dateSelected}
            onChange={(newValue) => {
              // setValue(newValue["$d"]);
              console.log("new value on change", newValue)
              setDateSelected(newValue)
              // setValue(newValue["$d"])
            }}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />
        </LocalizationProvider>
        <IconButton>
          <NavigateNextIcon 
            id="add"
            onClick={(e) => {
              changeDate(e)
            }}
          />
        </IconButton>
      </Box>
  )
}