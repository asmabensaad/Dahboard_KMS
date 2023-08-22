import {Box , IconButton ,useTheme} from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext,tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';
import  LightModeOutlined  from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon  from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon  from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcons  from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon  from '@mui/icons-material/PersonOutlined';
import SearchIcon  from '@mui/icons-material/PersonOutlined';
import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../Profile/UserProvider';
import UserProfile from '../Profile/UserProfile';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//const styledBox =styled(Box);
const Topbar =() => {
    const theme =useTheme();
    const colors =tokens(theme.palette.mode);
    const colorMode =useContext(ColorModeContext);
    const {user} =useUser();
    const navigate=useNavigate();
    const handleUserProfileClick =async() => {
        try{
            const response =await axios.get('http://localhost:2023/api/Users/getCurrentUser',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },

            });
            if(response.status ===200){
                
             
                const { userId, userName, email, phoneNumber } = response.data;
                navigate('/user-profile', {
                    state:{ 
                        userId,
                        userName,
                        email,
                        phoneNumber,
                    }

                  
                });
            }
        }catch (error){
            console.error('Error fetching user data', error);
        }
       
    };
        return(
        
        <Box display='flex' justifyContent='space-between' p={2}> 
        {/*Search Bar */}
          <Box display='flex'
              backgroundColor={colors.primary[400]}
              borderRadius='3px'
              >
            <InputBase sx = {{ m1: 2, flex: 1 }} placeholder ='Search'/>
            <IconButton type='button' sx={{ p : 1 }}>
                <SearchIcon/>
            </IconButton>
            </Box>

{/*Icons*/}

        <Box display='flex'>

            <IconButton onClick={colorMode.toggleColorMode}>
                { theme.palette.mode==='dark'? (
                    <DarkModeOutlinedIcon/>
                ): (
                <LightModeOutlined/>
                )}
            </IconButton>

            <IconButton>
                <NotificationsOutlinedIcon/>
            </IconButton>
            
            <IconButton>
            <SettingsOutlinedIcons />
            </IconButton>
            <IconButton onClick={handleUserProfileClick}  >
                <PersonOutlinedIcon/>
            </IconButton>
            
        </Box>
        </Box>
      
        
     );
         
        
}
export default Topbar;