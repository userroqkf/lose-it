import Checkbox from "@mui/material/Checkbox";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";

export default function DeleteCheckBox(props) {
  return (
    <Checkbox
      icon={<DeleteSharpIcon />}
      checkedIcon={<DeleteSharpIcon />}
      {...props}
    />
  );
}
