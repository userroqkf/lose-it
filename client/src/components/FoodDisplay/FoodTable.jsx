import { useState, useCallback, useEffect } from "react";
import { DataGrid, GridActionsCellItem} from "@mui/x-data-grid";

import DeleteCheckBox from "../DeleteCheckBox";

import DeleteIcon from '@mui/icons-material/Delete';

export default function FoodTable(props) {

  const {tempTestingData, setFoodMacro,foodMacro, showAlert, setShowAlert,
    foodMacroSum, setFoodMacroSum, datePicker, setFixedFoodData, fixedFoodData, datePickerString} = props;


  const columns = [
    { field: "brand", headerName: "Brand", flex: 1 },
    { field: "food", headerName: "Food", flex: 1 },
    { field: "carb", headerName: "Carb", flex: 1 },
    { field: "protein", headerName: "Protein", flex: 1 },
    { field: "fat", headerName: "Fat", flex: 1 },
    { field: "calories", headerName: "Calories", flex: 1 },
    { field: "perserving", headerName: "Per Serving", flex: 1},
    { field: "servingunit", headerName: "Serving Unit", flex: 1},
    { field: "servingSize", headerName: "Serving Size",flex: 1},
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => deleteItem(params.id)}
        />,
      ],
    },
  ]

  const deleteItem = useCallback(
    (id) => {
      setTimeout(() => {
        setFoodMacro((prevRows) => prevRows.filter((row) => row.id !== id));
        setShowAlert((prev) => { return {...prev, message:"Deleted Item", open: true}})

        const filteredData = fixedFoodData[datePickerString].filter((row, index) => {
          return row.id !== id
        })
        setFixedFoodData(prev => {
          return {...prev, [datePickerString]: filteredData}
        })

      });
    },
    [setFoodMacro, setShowAlert, setFixedFoodData, fixedFoodData, datePickerString],
  );

  return (
    <DataGrid
    //loading overlay
      // loading={true}
      rows={tempTestingData}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      // checkboxSelection
      // experimentalFeatures={{ newEditingApi: true }}
      // components={{
      //   BaseCheckbox: DeleteCheckBox
      // }}
      // onSelectionModelChange={(data) => {
      //   // deleteData(data[0]);
      // }}
      // selectionModel={selectionModel}
      // sx={{
      //   "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
      //     {
      //       display: "none",
      //     },
      // }}
    />
  )
}