import { useState, useCallback, useEffect } from "react";
import { DataGrid, GridActionsCellItem} from "@mui/x-data-grid";

import DeleteCheckBox from "../DeleteCheckBox";

import DeleteIcon from '@mui/icons-material/Delete';

export default function FoodTable(props) {

  const {tempTestingData, setFoodMacro, setShowAlert,setFixedFoodData, fixedFoodData, 
    datePickerString, apiServerUrl} = props;


  const columns = [
    { field: "brand", headerName: "Brand", flex: 1 },
    { field: "food", headerName: "Food", flex: 1 },
    { field: "carb", headerName: "Carb", flex: 1 },
    { field: "protein", headerName: "Protein", flex: 1 },
    { field: "fat", headerName: "Fat", flex: 1 },
    { field: "calories", headerName: "Calories", flex: 1 },
    { field: "perServing", headerName: "Per Serving", flex: 1},
    { field: "servingUnit", headerName: "Serving Unit", flex: 1},
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
  const deleteFoodData = (id) => {
    fetch(`${apiServerUrl}/api/users/${1}/food/delete`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({foodId: id})
    })
  }

  const deleteItem = useCallback(
    (id) => {
      setTimeout(async() => {
        await deleteFoodData(id);
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
    [setFoodMacro, setShowAlert, setFixedFoodData, fixedFoodData, datePickerString, deleteFoodData],
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