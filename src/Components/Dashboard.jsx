import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeWidget } from "../redux/dashboardSlice";
import Widget from "./Widget";
import AddWidget from "./AddWidget";
import {Box, Typography ,styled  } from '@mui/material'



const Container = styled(Box)`
  background-color:#f8f9f9;
`;

const Mainheading=styled(Box)`
  display:flex;
  margin: 2% 7% 0 5%;
  padding-top:5%;
`;

const MainComponent=styled(Box)`
  margin-left:5%;
`;


const AddWidgetButton = styled(Box)`
  margin: 13px 103px 15px 7px;
`;

const AddButton = styled('button')`
  width:356px;
  height:365px;
  border-radius: 5%;
  background-color: white;
  font-weight: 500;
  padding: 5px 20px;
  border: 1px solid grey;
  cursor: pointer;
`;



const Dashboard = () => {
  const dispatch = useDispatch();
  const [open,setOpen]=useState(false);
  const { categories, searchTerm } = useSelector(state => state.dashboard);
  const [selectedCategory, setSelectedCategory] = useState("");

  const openDialog=(categoryId)=>{
    setOpen(true)
    setSelectedCategory(categoryId)
  }  

  return (
    <Box>
      
        <Container>
          <Mainheading styled={{display:'flex'}}>
          <Typography style={{  fontWeight:'600',fontSize:'24px',marginRight:'auto'}}>CNAPP Dashboard</Typography>
          <button style={{backgroundColor:'white'}} onClick={() => openDialog(categories)}>Add Widget +</button>
          </Mainheading>
        {categories.map(category => (
          <MainComponent key={category.id}>
            <h2>{category.name} Dashboard</h2>
          <Box style={{display:'flex'}}>
          {category.widgets
            .filter(widget => widget.name.includes(searchTerm))
            .map(widget => (
              <Widget
              key={widget.id}
              widget={widget}
              categoryId={category.id}
              onRemove={() => dispatch(removeWidget({ categoryId: category.id, widgetId: widget.id }))}
              />
            ))}
            <AddWidgetButton>

                <AddButton onClick={() => openDialog(category.id)}>+ Add Widget</AddButton>
            </AddWidgetButton>
              </Box>
        </MainComponent>
      ))}
      {selectedCategory && (
        <AddWidget categoryId={selectedCategory} onClose={() => setOpen(false)} open={open} setOpen={setOpen} />
      )}
      </Container>
    </Box>
  );
};

export default Dashboard;
