import { useState } from "react";
//import { ProSidebar} from 'react-pro-sidebar';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import {Box,IconButton,Typography,useTheme} from '@mui/material';
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import  LightModeOutlined  from '@mui/icons-material/LightModeOutlined';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import { LoginOutlined} from "@mui/icons-material";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { Map, SecurityUpdateOutlined } from "@mui/icons-material";
import { LogoutOutlined } from "@mui/icons-material";
import {Source} from '../../auth2/Index';
import {Login}from '../../auth2/Login';

const Item =({title,to,icon,selected,setSelected})=> {
  const theme=useTheme();
  const colors=tokens(theme.palette.mode);
  return (
    <MenuItem active={selected === title}
    style={{ color:colors.grey[100]}}
    onClick={()=> setSelected(title)}
    icon={icon}
    >
      <Typography>{title}</Typography>
      <Link  to={to}/>
    </MenuItem>
  );
}
const Sidebar =() => {
    const theme=useTheme ();
    const colors =tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed]=useState(false);
    const [selected , setSelected] =useState("Dashboard");
    return (
     <Box sx={{

            '& .pro-sidebar-inner': {
              background: `${colors.primary[400]} !important`,
            },
            '& .pro-icon-wrapper': {
              backgroundColor: 'transparent !important',
            },
            '& .pro-inner-item': {
              padding: '5px 35px 5px 20px !important',
            },
            '& .pro-inner-item:hover': {
              color: '#868dfb !important',
            },
            '& .pro-menu-item.active': {
              color: '#6870fa !important',
            },
  
          }}
        >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape='square'>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
          >
{/*onclick collapsed mouvemeent de side navbar */}
            {!isCollapsed && (
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                ml='15px'
              >
                <Typography variant='h3' color={colors.grey[100]}>
                  ADMIN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {/*USER */}
          {!isCollapsed && (
            <Box mb='25px'>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <img
                    alt='profile-user'
                    width='100px'
                    height='100px'
                    src={'../../assets/user.png'}
                    style={{ cursor:'pointer', borderRadius:'50px'}}
                     />
                </Box>
                <Box textAlign='center' >
                    <Typography
                    variant='h2'
                    color={colors.grey[100]}
                    fontWeight='bold'
                    sx={{ m : "10px 0 0 0"}}
                    >
                        Asma
                        </Typography>
                    <Typography variant='h5'
                    color={colors.greenAccent[100]}
                    >  Ben Saad
                    </Typography>
                </Box>
            </Box>
          )}
            {/* MENUS*/}
            <Box paddingLeft={isCollapsed ? undefined : '10%'}>
              <Item
              title="Dashboard"
              to='/'
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              />
              <Typography
              variant ='h6'
              color={colors.grey[300]}
              sx={{m:'15px 0 5px 20px'}}
              > Data</Typography>




              <Item
              title="Manage Team"
              to='/team'
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              />
              <Item
              title="Contacts Infotrmation"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              />
               <Item
              title="List of Secrets"
              to="/secrets"
              icon={<SecurityUpdateOutlined />}
              selected={selected}
              setSelected={setSelected}
              />
              
              <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              />
               <Typography
              variant ='h6'
              color={colors.grey[300]}
              sx={{m:'15px 0 5px 20px'}}
              > Pages</Typography>

              <Item
              title="calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              />
              <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              />
               <Typography
              variant ='h6'
              color={colors.grey[300]}
              sx={{m:'15px 0 5px 20px'}}
              > CHarts</Typography>

              <Item
              title="Geography CHart"
              to="/geography"
              icon={<MapOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
              />

              <Item
              title="Logout "
              to="/login"
              icon={<LogoutOutlined/>}
              selected={selected}
              setSelected={setSelected}
              />
              <Item
              title="Register "
              to="/Source"
              icon={<LoginOutlined/>}
              selected={selected}
              setSelected={setSelected}
              />
            </Box>



          </Menu>
          </ProSidebar>


        
        </Box>
    );
};
export default Sidebar;