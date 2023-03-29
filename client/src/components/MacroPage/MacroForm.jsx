import { useEffect, useState } from "react";
import { InputAdornment, TextField, Button, Box } from "@mui/material";


export default function MacroForm(props) {
  const {macroData, apiServerUrl, user, setMacroData, getAccessTokenSilently} = props;

  const [macroInput, setMacroInput] = useState(macroData);
  const [invalidInput, setInvalidInput] = useState({
    protein: false,
    carb: false,
    fat: false,
    calories: false,
  });

  useEffect(() => {
    setMacroInput(macroData)
  }, [macroData])

  const validateInput = (input) => {
    const validateInputCleaned = {
      protein: input.protein, 
      carb:input.carb, 
      fat: input.fat, 
      calories: input.calories
    };
    return Object.values(validateInputCleaned).every((value) => Number(value));
  }

  const changeMacroData = async(macroInput) => {
    const accessToken = await getAccessTokenSilently()
    const validateInputCleaned = {
      protein: macroInput.protein, 
      carb:macroInput.carb, 
      fat: macroInput.fat, 
      calories: macroInput.calories
    };
    if (Object.keys(user).length !== 0) {
      fetch(`${apiServerUrl}/api/users/${user.sub}/macro`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${accessToken}`,
        },
        body: JSON.stringify(validateInputCleaned)
      })
    }
  }

  

  return (
    <form>
      <Box
        display={'flex'}
        flexDirection={'column'}
        width={"80%"}
        height={"100%"}
        margin={"auto"}
      >
        <TextField 
          id="outlined-basic" 
          label="Protein" 
          variant="outlined" 
          margin="dense"
          InputProps={{
            endAdornment: <InputAdornment position="end">g</InputAdornment>,
          }}
          value={macroInput.protein}
          onChange={(e) => {
            e.preventDefault();
            setMacroData((prev) => {
              return {...prev, protein: Number(e.target.value) ? Number(e.target.value) : e.target.value}
            })
            if (!Number(e.target.value)) {
              setInvalidInput(prev => {
                return {...prev, protein: true};
              })
            } else {
              setInvalidInput(prev => {
                return {...prev, protein: false};
              })
            }
          }}
          error={invalidInput.protein}
          helperText={invalidInput.protein ? 'Invalid Input' : ' '}
        />
        <TextField 
          id="outlined-basic" 
          label="Carbohydrate" 
          variant="outlined" 
          margin="dense"
          InputProps={{
            endAdornment: <InputAdornment position="end">g</InputAdornment>,
          }}
          value={macroInput.carb}
          onChange={(e) => {
            e.preventDefault();
            setMacroData((prev) => {
              return {...prev, carb: Number(e.target.value) ? Number(e.target.value) : e.target.value}
            })
            if (!Number(e.target.value)) {
              setInvalidInput(prev => {
                return {...prev, carb: true};
              })
            } else {
              setInvalidInput(prev => {
                return {...prev, carb: false};
              })
            }
          }}
          error={invalidInput.carb}
          helperText={invalidInput.carb ? 'Invalid Input' : ' '}
        />
        <TextField 
          id="outlined-basic" 
          label="Fat" 
          variant="outlined" 
          margin="dense"
          InputProps={{
            endAdornment: <InputAdornment position="end">g</InputAdornment>,
          }}
          value={macroInput.fat}
          onChange={(e) => {
            e.preventDefault();
            setMacroData((prev) => {
              return {...prev, fat: Number(e.target.value) ? Number(e.target.value) : e.target.value}
            })
            if (!Number(e.target.value)) {
              setInvalidInput(prev => {
                return {...prev, fat: true};
              })
            } else {
              setInvalidInput(prev => {
                return {...prev, fat: false};
              })
            }
          }}
          error={invalidInput.fat}
          helperText={invalidInput.fat ? 'Invalid Input' : ' '}
        />
        <TextField 
          id="outlined-basic" 
          label="Calories" 
          variant="outlined" 
          margin="dense"
          InputProps={{
            endAdornment: <InputAdornment position="end">KCal</InputAdornment>,
          }}
          value={macroInput.calories}
          onChange={(e) => {
            e.preventDefault();
            setMacroData((prev) => {
              return {...prev, calories: Number(e.target.value) ? Number(e.target.value) : e.target.value}
            })
            if (!Number(e.target.value)) {
              setInvalidInput(prev => {
                return {...prev, calories: true};
              })
            } else {
              setInvalidInput(prev => {
                return {...prev, calories: false};
              })
            }
          }}
          error={invalidInput.calories}
          helperText={invalidInput.calories ? 'Invalid Input' : ' '}
        />
        <Button 
          type="submit"
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            if (validateInput(macroInput)) {
              changeMacroData(macroInput);
            }
          }}
        >
          Change Macro
        </Button>
      </Box>
        </form>
  )
}