import React, { useState, useEffect } from "react";

// Set Initial value to the current date (1-last day of the month)
// Use state to change x-axis and data grid
// dependent state I can use useEffect 
// Take a look at https://stackoverflow.com/questions/61569172/associate-a-state-with-another-state-in-usestate-hook
// Want to refactor such that there is a chain reaction when we change the date from datePicker component

export default function useWeightChartDataSetter() {

  const addDays = function(days) {
    var date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }


  const values = new Array(100).fill(0).map(
    (int, index) => {
      return {x: addDays(index), y: int}
    }
  )

  const [weightInput, setWeightInput] = useState("")
  const [weightData, setWeightData] = useState(values)
  // const [weightLabel, setWeightLabel] = useState(['2016-12-25', '2016-12-26', '2016-12-27'])


  function GetFirstLastDayOfMonth(props) {
    const month = props
    const FirstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastDayOfMonth = new Date(month.getFullYear(), month.getMonth()+1, 0);
    setXAxis([FirstDayOfMonth, lastDayOfMonth])
  }

  //Setting Calandar date
  const [value, setValue] = useState(new Date());

  //Setting chart min and max value
  const [xAxis, setXAxis] = useState(() => GetFirstLastDayOfMonth(value))

  useEffect(() => {
    setXAxis(value)
  },[value])
}
  