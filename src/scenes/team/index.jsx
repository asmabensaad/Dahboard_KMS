import { Box ,Typography,useTheme,Button } from "@mui/material";
//import { Icon, getIconUtilityClass, iconClasses} from '@mui/icons-material';
import { DataGrid ,GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import {Alert} from "@mui/material";
import Header from "../../components/Header";
import { number } from "yup";
import axios from "axios";
import { useState,useEffect } from "react";
import UpdateTeam from './updateTeam';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import DeleteIcon from '@mui/icons-material/Delete';



const Team =() => {
const theme =useTheme();
const colors=tokens(theme.palette.mode);
const [snackbarOpen, setSnackbarOpen] = useState(false);
const [setMessage,setErrMsg]=useState('');
const [rows, setRows] = useState([]);
const [selectedRow, setSelectedRow] = useState(null);

const [users,setUsers]=useState([]);


const handleUpdateTeam = (row) => {
    setSelectedRow(row);
};

const Cancel = ()=>{
    setSelectedRow(null)
}

useEffect(() => {
    displayData();
},[]);

const displayData =async () =>{
  
    try{
       
            const response =await axios.get('http://localhost:2023/api/Users/GetAllUsers',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
            setUsers(response.data);

            
            const data = response?.data || [];
          
            setRows(data);
          

        }catch (err)
        {
            if(!err?.response){
            setErrMsg('No Server Response');
        }else if(err.response?.status ===409){
           setErrMsg('NO DATA TO DISPLAY')
        }
     
    }
};
   


const deleteUserData =async ( row ) =>{
  
       try{
        const response =await axios.delete(`http://localhost:2023/api/Users/DeleteUser?userId=${row.id}`,{
            headers:{
               
                Authorization:`Bearer ${localStorage.getItem("token")}`,
            },  
          
            
           },
    
        );
        
        if(response.status==200){
            
            setSnackbarOpen(true);
            setMessage("user deleted successfully");
            
        }
        

}catch(error){
    console.error('error deleting user:',error);
}

};



const handleDeleteTeam=  (row) => {
    
    try { 
         deleteUserData(row);
        setRows(prevRows => prevRows.filter(prevRow =>prevRow.id !==row.id));
    } catch(error)
    {
        console.error('Error deleting user:', error);
    }
};


const columns=[
    {field: 'id' , headerName:'Id',flex:1,UpdateTeam},
    { field:'username' ,
     headerName:'username',
     flex :1 ,
     cellClassName:'name-column--cell' },
     
     { field:'contactNumber' ,
     headerName:'contactNumber',
     flex :1 
     },

     { field:'email' ,
     headerName:'email',
     flex :1 
     },

  
      
     { field:'Manage the Team' ,
     headerName:'Manage Team',
     flex :1 ,

     sortable: false,
     filterable: false,
     renderCell: (params) => (
         <>
             <Button variant="contained" color="success" onClick={() => handleUpdateTeam(params.row)}>Update</Button>
             <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => handleDeleteTeam(params.row)} >Delete</Button>
         </>
     ),
    
    
    },
];


let navigate = useNavigate();
const routeChange = () => {
    navigate('/updateTeam');
}

const handleSnackbarClose = () => {
  
    setSnackbarOpen(false);
  };

return (

 

<Box m='20px'>
    <Header title ="TEAM" subtitle="Managing the team Members" />
    {selectedRow ? <UpdateTeam onGoBack={Cancel} formData={selectedRow} />:
    <Box m='40px 0 0 0' height='75vh' sx ={{
        '& .MuiDataGrid--root': {
            border:'none',
        },
        '& .MuiDataGrid-cell': {
            borderBottom:'none'
        },
        '& .name-column--cell': {
            color:colors.greenAccent[300]
        },
        '& .MuiDataGrid-columnHeaders' : {
            backgroundColor: colors.blueAccent[700],
            borderBottom:'none'
        },
        '& .MuiDataGrid-virtualScroller' : {
            backgroundColor: colors.primary[400],
            
        },

        '& .MuiDataGrid-footerContainer': {
            borderTop:'none',
            backgroundColor:colors.blueAccent[700]
        },

        '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,

        }

    }}>
        <DataGrid rows={rows} columns={columns}   />
    </Box>
}



<Snackbar
open={snackbarOpen}
autoHideDuration={3000}
onClose={handleSnackbarClose}
>
<MuiAlert
  elevation={6}
  variant="filled"
  onClose={handleSnackbarClose}
  severity="success"
>
  User deleted successfully
</MuiAlert>
</Snackbar>



</Box>


);

};
export default Team;
