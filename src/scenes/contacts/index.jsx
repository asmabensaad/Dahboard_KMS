import { Box ,useTheme } from "@mui/material";
import { useState,useEffect } from "react";
import { tokens } from "../../theme";
import { number } from "yup";
import { DataGrid ,GridToolbar } from "@mui/x-data-grid";

import Header from "../../components/Header";
import axios from "axios";
const Contacts =() => {
const theme =useTheme();
const colors=tokens(theme.palette.mode);
const columns=[
    {field: 'id' , headerName:'Id',flex:1},
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

     
      
];

    const [errMsg,setErrMsg]=useState('');
    
    const [rows, setRows] = useState([]);
  
    
        useEffect(() => {

            const displayData =async (e) =>{
              
                try{
                   
                        const response =await axios.get('http://localhost:2023/api/Users/GetAllUsers',{
                            headers:{
                                Authorization:`Bearer ${localStorage.getItem("token")}`
                            }
                        });
                       
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
               displayData();
            },[]);



        return (
      <Box m='20px'>
    <Header title ="Contacts" subtitle="List Of Contacts" />
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
        <DataGrid rows={rows} columns={columns}  components={{Toolbar:GridToolbar}}/>
    </Box>
</Box>




);

};
export default Contacts;
