import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWidget } from "../redux/dashboardSlice";
import {
  Drawer,
  Typography,
  Box,
  styled,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const HeadingStyle = styled(Box)`
  background-color: #03056f;
  color: white;
  display: flex;
`;

const Cancelbtn = styled(Button)`
  color: #03056f;
  border: 1px solid black;
  padding: 5px 25px;
  right: 120px;
  position: absolute;
  bottom: 10px;
`;

const Submitbtn = styled(Button)`
  background-color: #03056f;
  color: white;
  border: 1px solid black;
  padding: 5px 25px;
  position: absolute;
  bottom: 10px;
  right: 5px;
`;

const CategoryContainer = styled(Box)`
  margin: 15px 35px;
`;

const Checkboxstyles=styled(Box)`
  border:1px solid grey;
  border-radius:5px;
  margin-bottom:5px;
`;

const StyledToggleButton = styled(ToggleButton)(({  selected }) => ({
  borderBottom: selected ? `3px solid #03056f` : "none",
  color: selected ? '#03056f' : "inherit",
  "&.Mui-selected": {
    color: '#03056f',
    borderBottom: `3px solid #03056f`,
  },
}));

const AddWidget = ({ categoryId, onClose, open }) => {
  const dispatch = useDispatch();
  const [selectedButton, setSelectedButton] = useState(null);
  const [checkedCategories, setCheckedCategories] = useState({});

  // Use selector to get categories from Redux store
  const categories = useSelector((state) => state.dashboard.categories);

  const handleToggleChange = (event, newSelection) => {
    setSelectedButton(newSelection);
  };



  const handleCheckboxChange = (category) => (event) => {
    setCheckedCategories((prev) => ({
      ...prev,
      [category]: event.target.checked,
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  
  // Filter widgets based on checked state
  const selectedWidgets = Object.keys(checkedCategories)
    .filter(widgetName => checkedCategories[widgetName])
    .map(widgetName => {
      return categories
        .find(category => category.name === selectedButton)
        ?.widgets.find(widget => widget.name === widgetName);
    })
    .filter(widget => widget !== undefined); // Remove undefined values

  selectedWidgets.forEach(widget => {
    dispatch(addWidget({ categoryId, widget }));
  });

  onClose();
};


  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: "50%" } }}
    >
      <HeadingStyle>
        <Typography style={{ marginRight: "auto" }}>Add Widget</Typography>
        <Close onClick={onClose} style={{ cursor: "pointer" }} />
      </HeadingStyle>
      <Typography
        style={{ margin: "15px 20px", fontWeight: "600", color: "grey" }}
      >
        Personalise your dashboard by adding the following widget
      </Typography>
        {/* Render ToggleButton dynamically based on categories */}
        <ToggleButtonGroup
          value={selectedButton}
          exclusive
          onChange={handleToggleChange}
          style={{ marginBottom: "15px" }}
        >
          {categories.map((category) => (
            <StyledToggleButton 
            key={category.id} 
            value={category.name}
            selected={selectedButton === category.name}
            >
              {category.name}
            </StyledToggleButton>
          ))}
        </ToggleButtonGroup>

        {/* Conditionally render checkboxes for the selected category */}
        {selectedButton && (
          <CategoryContainer>

            {categories
              .find((category) => category.name === selectedButton)
              ?.widgets.map((widget) => (
                <Checkboxstyles>
                <FormControlLabel
                key={widget.id}
                style={{marginLeft:'5px'}}
                control={
                  <Checkbox
                  checked={checkedCategories[widget.name] || false}
                  onChange={handleCheckboxChange(widget.name)}
                  />
                }
                label={widget.name}
                />
                </Checkboxstyles>
              ))}
          </CategoryContainer>
        )}

        <Cancelbtn type="button" onClick={onClose}>
          Cancel
        </Cancelbtn>
        <Submitbtn onClick={(e)=>{handleSubmit(e)}} type="submit">Submit</Submitbtn>
    </Drawer>
  );
};

export default AddWidget;
