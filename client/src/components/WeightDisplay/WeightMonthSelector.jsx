import { useEffect } from "react";

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

export default function WeightMonthSelector(props) {

  const {setValue, dateSelected, setDateSelected} = props;

  useEffect(() => {
    setValue(dateSelected["$d"])
  }, [dateSelected, setValue])


  const changeDate = (e, value) => {
    if (value === "add") {
      setDateSelected((date) => {
        const updatedDate = date.add(1, "month")
        return updatedDate;
      });
    } else if (value === "sub") {
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
        <IconButton
          onClick={(e) => {
            changeDate(e, "sub")
          }}
        >
          <NavigateBeforeIcon
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
              setDateSelected(newValue)
            }}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />
        </LocalizationProvider>
        <IconButton
          onClick={(e) => {
            changeDate(e, "add")
          }}
        >
          <NavigateNextIcon/>
        </IconButton>
      </Box>
  )
}