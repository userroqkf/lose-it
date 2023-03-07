import { useState, useCallback } from "react";
import { DataGrid, GridActionsCellItem} from "@mui/x-data-grid";

import DeleteCheckBox from "../DeleteCheckBox";

import DeleteIcon from '@mui/icons-material/Delete';

export default function FoodTable(props) {

  const {tempTestingData, setFoodMacro,foodMacro, showAlert, setShowAlert,foodMacroSum, setFoodMacroSum} = props;


  const columns = [
    { field: "brand", headerName: "Brand", flex: 1 },
    { field: "food", headerName: "Food", flex: 1 },
    { field: "carb", headerName: "Carb", flex: 1 },
    { field: "protein", headerName: "Protein", flex: 1 },
    { field: "fat", headerName: "Fat", flex: 1 },
    { field: "calories", headerName: "Calories", flex: 1 },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => deleteUser(params.id)}
        />,
      ],
    },
  ]

  const deleteUser = useCallback(
    (id) => {
      setTimeout(() => {
        setFoodMacro((prevRows) => prevRows.filter((row) => row.id !== id));
        setShowAlert((prev) => { return {...prev, message:"Deleted Item", open: true}})
        setFoodMacroSum(foodMacro)
        // console.log("macro",foodMacro)
        // console.log("macro sum",foodMacroSum)
      });
    },
    [setFoodMacro, setShowAlert,setFoodMacroSum, foodMacro],
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