import * as React from "react";
import PropTypes from "prop-types";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { passwordCotext, usePassword } from "../context/ContextProvider";

const PrettoSlider = styled(Slider)({
  color: "#7986cb",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#7986cb",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});
function CustomizedSlider() {
  const passCotext = React.useContext(passwordCotext);
  const { sliderVal, setSliderVal } = usePassword();

  const [defaultVal, setDefaultVal] = React.useState(12);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ m: 6 }} />
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={sliderVal}
        onChange={(e) => {
          e.target.value <= 50 && setSliderVal(e.target.value);
        }}
        min={4}
        max={50}
        sx={{ height: "5px" }}
      />
      <Box sx={{ m: 3 }} />
    </Box>
  );
}
export default CustomizedSlider;
