import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import DeleteCheckBox from "../DeleteCheckBox";

export default function QueryTable(props) {

  const { queryFoodData} = props;

  console.log("props table",queryFoodData);

  const [selectionModel, setSelectionModel] = useState([]);

  const gridData = [];

  queryFoodData.forEach((value, index) => {
    console.log(
      value["foodNutrients"][0]["value"],
      value["foodNutrients"][1]["value"],
      value["foodNutrients"][2]["value"],
      value["foodNutrients"][3]["value"]
    )
    const foodDataCleaned = {
      id: value["fdcId"],
      brand: value["brandName"],
      food: value["description"],
      protein: value["foodNutrients"][0]["value"],
      fat: value["foodNutrients"][1]["value"],
      carb: value["foodNutrients"][2]["value"],
      calories: value["foodNutrients"][3]["value"]
    }
    gridData.push(foodDataCleaned);
  })


  const columns = [
    { field: "brand", headerName: "Brand", flex: 1 },
    { field: "food", headerName: "Food", flex: 1 },
    { field: "carb", headerName: "Carb", flex: 1 },
    { field: "protein", headerName: "Protein", flex: 1 },
    { field: "fat", headerName: "Fat", flex: 1 },
    { field: "calories", headerName: "Calories", flex: 1 },
  ]

  return (
    <DataGrid
      rows={gridData}
      columns={columns}
      pageSize={100}
      // rowsPerPageOptions={[25, 50, 100]}
      checkboxSelection
      experimentalFeatures={{ newEditingApi: true }}
      // components={{
      //   BaseCheckbox: DeleteCheckBox
      // }}
      // onSelectionModelChange={(data) => {
      //   // deleteData(data[0]);
      // }}
      selectionModel={selectionModel}
      // sx={{
      //   "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
      //     {
      //       display: "none",
      //     },
      // }}
    />
  )
}