import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

import DeleteCheckBox from "../DeleteCheckBox";

export default function QueryTable(props) {

  const { queryFoodData} = props;

  const [selectionModel, setSelectionModel] = useState([]);

  const [gridData, setGridData] = useState([]);

  function cleanQueryFoodData(foodData) {
    const foodDataCleaned = [];
    foodData.forEach((value, index) => {
        const newFood = {
          id : value["fdcId"],
          brand: "",
          food: "",
          protein: "",
          fat: "",
          carb: "",
          caloires: ""
        }

        if (value["foodNutrients"]) {
        
          newFood["brand"] = value["brandName"]
          newFood["food"] = value["description"]

          value["foodNutrients"].forEach((nutrient, index) => {
            if (nutrient["nutrientId"] === 1003) {
              newFood["protein"] = nutrient["value"]
            }
            if (nutrient["nutrientId"] === 1004) {
              newFood["fat"] = nutrient["value"]
            }
            if (nutrient["nutrientId"] === 1005) {
              newFood["carb"] = nutrient["value"]
            }
            if (nutrient["nutrientId"] === 1008) {
              newFood["calories"] = nutrient["value"]
            }
            foodDataCleaned.push(newFood)
          })
        }
      })
      return foodDataCleaned
  }
  

  useEffect(() => {
    const data = cleanQueryFoodData(queryFoodData);
    console.log(data)
    setGridData(data);
  }, [queryFoodData])

  


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