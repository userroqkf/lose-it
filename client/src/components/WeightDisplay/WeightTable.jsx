import { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';

export default function WeightTable(props) {
  const { weightData, setFixedData, apiServerUrl } = props;

  function getRowById(rowId) {
    return gridData.filter((data) => data.id === rowId);
  }

  //Delete data from database
  const deleteWeightData  = async(date) => {
    const [day, month, year] = date.toLocaleDateString().split('/')
    const inputDateCleaned = `${year}-${month}-${day}`
    console.log(inputDateCleaned);
    const res = await fetch(`${apiServerUrl}/api/users/${1}/weight/delete`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({inputDate: inputDateCleaned})
    });
    return res
  };

  // When Delete Icon is pressed in DataGrid, filter data from fixed Data => trigger rerender for chart as well
  const deleteData = async(rowId) => {
    console.log(rowId)
    const rowData = getRowById(rowId);
    const [day, month, year] = rowData[0].date.split('/');
    const rowDataDate = new Date(year, month - 1, day);
    await deleteWeightData(rowDataDate);
    setFixedData((prev) => {
      return prev.filter((data) => {
        return data.x.toDateString() !== rowDataDate.toDateString();
      });
    });
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
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      headerName: "Delete",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete Item"
          onClick={() => {
            deleteData(params.row.id)
          }}
        />,
      ],
    },
  ];


  return (
    <Box position={"relative"} height={"50%"} width={"80vw"} margin={"auto"}>
      <DataGrid
        rows={gridData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  )
}