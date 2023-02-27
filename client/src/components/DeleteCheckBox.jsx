import React from "react";
import Checkbox from "@mui/material/Checkbox";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";

const DeleteCheckBox = React.forwardRef((props, ref) => {
  return (
    <Checkbox
      icon={<DeleteSharpIcon />}
      checkedIcon={<DeleteSharpIcon />}
      {...props}
    />
  )
});

export default DeleteCheckBox;