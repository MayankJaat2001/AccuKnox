import {Box, Typography , InputBase ,styled } from '@mui/material'
import { useSelector, useDispatch } from "react-redux";
import {Search}  from '@mui/icons-material'
import { setSearchTerm } from "../redux/dashboardSlice";



const SearchContainer=styled(Box)`
  display:flex;
  position:relative;
  background-color:#f8f9f9;
  margin-left:40%;
  height: 205%;
  width: 30%;
  border-radius:5px;
  align-item:center;
  padding-left:5px;
`
const StyledNavbar = styled(Box)`
  display:flex;
  height:15px;
  background-color:white;
  margin:10px 55px;
  padding:0%;
`;


const SearchIcon = styled(Box)`  
      color:#a6acaf;
  `
const Navbar =()=>{
    const dispatch = useDispatch();
  const { searchTerm } = useSelector(state => state.dashboard);
    const handleSearch = (e) => {
        dispatch(setSearchTerm(e.target.value));
      };
    return(
        
        <StyledNavbar>
        <Typography style={{color:'grey'}}>Home &gt;</Typography><Typography style={{fontWeight:'700'}}> Dashboard V2</Typography>
          <SearchContainer>
            <SearchIcon>
            <Search/>
            </SearchIcon>
            <InputBase
               placeholder="Search anything.."
               value={searchTerm}
               onChange={handleSearch}
               />
               </SearchContainer>  
        </StyledNavbar>

    )
}

export default Navbar