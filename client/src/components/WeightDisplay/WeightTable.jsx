import { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import DeleteCheckBox from "../DeleteCheckBox";

export default function WeightTable(props) {
  const { weightData, setFixedData } = props;
  // Keep track of data grid row selection
  const [selectionModel, setSelectionModel] = useState([]);

  function getRowById(rowId) {
    return gridData.filter((data) => data.id === rowId);
  }

  //Delete data from database
  function deleteWeightData(date) {
    fetch()
  };

  // When Delete Icon is pressed in DataGrid, filter data from fixed Data => trigger rerender for chart as well
  function deleteData(rowId) {
    const rowData = getRowById(rowId);
    const [day, month, year] = rowData[0].date.split("/");
    const rowDataDate = new Date(year, month - 1, day);
    setFixedData((prev) => {
      return prev.filter((data) => {
        return data.x.toDateString() !== rowDataDate.toDateString();
      });
    });
    setSelectionModel([]);
  }

  // GridData Data
  const [gridData, setGridData] = useState(
    weightData.map((data, index) => {
      return { id: index, date: data.x.toLocaleDateString(), weight: data.y };
    })
  );


  useEffect(() => {
    setGridData(() =>
      weightData.map((data, index) => {
        return { id: index, date: data.x.toLocaleDateString(), weight: data.y };
      })
    );
  }, [weightData]);

  const columns = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "weight", headerName: "Weight", editable: true, flex: 1 },
  ];


  return (
    <Box position={"relative"} height={"50%"} width={"80vw"} margin={"auto"}>
      <DataGrid
        rows={gridData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        experimentalFeatures={{ newEditingApi: true }}
        components={{
          BaseCheckbox: DeleteCheckBox,
        }}
        onSelectionModelChange={(data) => {
          console.log("selected row id", data);
          deleteData(data[0]);
        }}
        selectionModel={selectionModel}
        sx={{
          "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
            {
              display: "none",
            },
        }}
      />
    </Box>
  )
}