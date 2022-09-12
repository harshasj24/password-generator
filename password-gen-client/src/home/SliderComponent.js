import React, { useContext, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import VolumeUp from "@mui/icons-material/VolumeUp";
import "./componentstyles.css";
import { passwordCotext } from "../context/ContextProvider";

const Input = styled(MuiInput)`
  width: 42px;
  border: none;
  outline: none;
`;

const SliderComponent = () => {
  const passContext = useContext(passwordCotext);

  const [value, setValue] = React.useState(10);
  useEffect(() => {
    passContext.setSliderVal(value);
    console.log(passContext.silderVal);
  }, []);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    passContext.setSliderVal(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(50);
    }
  };

  return (
    <div>
      <Box sx={{ width: 250 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Slider
              sx={{
                '& input[type="range"]': {
                  WebkitAppearance: "slider-vertical",
                },
              }}
              min={1}
              max={50}
              valueLabelDisplay="auto"
              value={typeof value === "number" ? value : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
            />
          </Grid>
          <Grid item>
            <Input
              value={value}
              size="small"
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 10,
                min: 0,
                max: 50,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default SliderComponent;
