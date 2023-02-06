import { useEffect, useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";

export default function DateSelector(props) {

  const [datePicker, setDatePicker] = useState(dayjs(new Date()));


  const changeDate = (e) => {
    if (e.target.id === "add") {
      setDatePicker((date) => date.add(1, "day"));
    } else if (e.target.id === "sub") {
      setDatePicker((date) => date.add(1, "day"));
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <IconButton>
        <NavigateBeforeIcon
          id="sub"
          onClick={(e) => {
            changeDate(e)
          }}
        />
      </IconButton>

          <DatePicker
            openTo="day"
            views={["year","month","day"]}
            label="Year and Month"
            minDate={new Date("2012-03-01")}
            maxDate={new Date("2023-06-01")}
            value={datePicker}
            onChange={(newDate) => {
              setDatePicker(newDate);
            }}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />

      <IconButton>
        <NavigateNextIcon
          id="add"
          onClick={(e) => {
            changeDate(e)
          }}
        />
      </IconButton>
        </LocalizationProvider>
    </Box>
  )
}