import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import DeleteCheckBox from "../DeleteCheckBox";

export default function FoodTable(props) {

  const [selectionModel, setSelectionModel] = useState([]);

  const gridData = [
    {
      id : Math.floor(Math.random()*100),
      date: new Date().toLocaleDateString(),
      carb: 200,
      protein: 100,
      fat: 200,
      calories: 600
    },
    {
      id : Math.floor(Math.random()*100),
      date: new Date().toLocaleDateString(),
      carb: 100,
      protein:200,
      fat: 150,
      calories: 350
    },
    {
      id : Math.floor(Math.random()*100),
      date: new Date().toLocaleDateString(),
      carb: 200,
      protein:400,
      fat: 750,
      calories: 1050
    }
  ]

  const columns = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "carb", headerName: "Carb", flex: 1 },
    { field: "protein", headerName: "Protein", flex: 1 },
    { field: "fat", headerName: "Fat", flex: 1 },
    { field: "calories", headerName: "Calories", flex: 1 },
  ]

  return (
    <DataGrid
      rows={gridData}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
      experimentalFeatures={{ newEditingApi: true }}
      components={{
        BaseCheckbox: DeleteCheckBox
      }}
      onSelectionModelChange={(data) => {
        // deleteData(data[0]);
      }}
      selectionModel={selectionModel}
      sx={{
        "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
          {
            display: "none",
          },
      }}
    />
  )
}