import { useState, useEffect, useCallback } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import AddIcon from '@mui/icons-material/Add';

import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";

export default function QueryTable(props) {

  const { queryFoodData, tempTestingData, setFoodMacro, foodMacro, showAlert, 
    setShowAlert, setFoodMacroSum, setFixedFoodData, fixedFoodData, datePickerString} = props;

  const [selectionModel, setSelectionModel] = useState([]);

  const [gridData, setGridData] = useState([]);

  function cleanQueryFoodData(foodData) {
    setGridData([])
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
          // error coming from here where forEach Loop
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
          })
          foodDataCleaned.push(newFood)
        }
      })
      return foodDataCleaned
  }
  

  useEffect(() => {
    console.log("queryfooddata")
    const data = cleanQueryFoodData(queryFoodData);
    console.log(data)
    setGridData(data);
  }, [queryFoodData])

  
  const addItem = useCallback(
    (id) => {
      setTimeout(() => {
        const addItemData = gridData.filter((row) => {
          console.log(row, row.id, id, row.id === id)
          return row.id === id
        });
        if (!foodMacro.some(obj => obj.id === id)) {
          setFoodMacro(prev => [...prev, addItemData[0]])
          setFixedFoodData(prev => {
            if (prev[datePickerString])
              return {...prev, [datePickerString]: [...prev[datePickerString],addItemData[0]]}
            else {
              return {...prev, [datePickerString]: [addItemData[0]]}
            }
          })
          setShowAlert((prev) => { return {...prev, message:"Added Item", open: true}})
          // setFoodMacroSum(foodMacro)
        } else {
          setShowAlert((prev) => { return {...prev, message:"Item Already Exists", open: true}})
        }
      });
    },
    [gridData, setFoodMacro, setShowAlert, foodMacro, datePickerString, setFixedFoodData],
  );

  // useEffect(() => {
  //   //add to fixed Data
  //   const datePicked = datePicker['$d']
  //   const dateToString = `${datePicked.getFullYear()}/${datePicked.getMonth() + 1}/${datePicked.getDate()}`
  //   setFixedFoodData(prev => {
  //     return {...prev, [dateToString]: foodMacro}})
  // }, [foodMacro])


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
      headerName: "Add Item",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<AddIcon />}
          label="Add Item"
          onClick={() => {
            addItem(params.id)
          }}
        />,
      ],
    },
  ]

  return (
    <DataGrid
      rows={gridData}
      columns={columns}
      pageSize={100}
      getRowId={(row) => row.id}

    />
  )
}