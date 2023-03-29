import { useCallback } from "react";
import { DataGrid, GridActionsCellItem} from "@mui/x-data-grid";

import DeleteIcon from '@mui/icons-material/Delete';

export default function FoodTable(props) {

  const {foodMacro, setFoodMacro, setShowAlert,setFixedFoodData, fixedFoodData, 
    datePickerString, apiServerUrl, user, getAccessTokenSilently} = props;


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
          onClick={() => deleteItem(params.id, params.row.foodId)}
        />,
      ],
    },
  ]

  const deleteItem = useCallback(
    (rowId, foodId) => {
      const deleteFoodData = async (id, date) => {
        const accessToken = await getAccessTokenSilently()
        fetch(`${apiServerUrl}/api/users/${user.sub}/food/delete`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${accessToken}`,
          },
          body: JSON.stringify({foodId: foodId, inputDate: date})
        })
      }

      setTimeout(async() => {
        await deleteFoodData(foodId, datePickerString);
        setFoodMacro((prevRows) => prevRows.filter((row) => row.id !== rowId));
        setShowAlert((prev) => { return {...prev, message:"Deleted Item", open: true}})

        const filteredData = fixedFoodData[datePickerString].filter((row, index) => {
          return row.id !== rowId
        })
        setFixedFoodData(prev => {
          return {...prev, [datePickerString]: filteredData}
        })
      });
    },
    [setFoodMacro, setShowAlert, setFixedFoodData, fixedFoodData, 
      datePickerString, apiServerUrl, user, getAccessTokenSilently]
  );

  return (
    <DataGrid
      rows={foodMacro}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
    />
  )
}