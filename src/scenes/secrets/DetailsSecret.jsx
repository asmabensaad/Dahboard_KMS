import { Box, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { number } from "yup";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import axios from "axios";
import { secretData } from "../../data/mockData";
import Header from "../../components/Header";
import './ListSecret.css';
import { useState, useEffect } from "react";
import UpdateSecret from "../updateSecret";
import { useParams } from "react-router-dom";


const DetailsSecret = () => {
    const theme = useTheme();
    const params= useParams()
    const colors = tokens(theme.palette.mode);
    const [selectedRow, setSelectedRow] = useState(null);
    const [errMsg, setErrMsg] = useState(false);
    const [secretDetails, setSecretDetails] = useState({});
    const [rows, setRows] = useState([]);
    
    const handleUpdateSecret =  (row) => {
        setSelectedRow(row);
    };
    const onGoBack = () => {
        setSelectedRow(null);
    };
    const fetchDetails = async(rows) =>  {
        try{
            const response =await axios.get('http://localhost:2000/api/v1.0/kms/Secrets/GetSecret/'`${params.key}`,
            {
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({
                  
                  })
                });
          
                if (response.status === 200 || response.status===201)  {
                  const jsonData=await response.json();
                 
                 
                  setErrMsg('success');
          
                 
                  
                } 
            }
          

                 catch (err) {
                    if (!err?.response) {
                        setErrMsg('No Server Response');
                    } else if (err.response?.status === 409) {
                        setErrMsg('NO DATA TO DISPLAY')
                    }
    
                }
           
          
        
                 
                
       
        console.log(params.key);
    }
    useEffect(()=>{
        fetchDetails();
    },[])

    const columns = [
        {
            field: 'key',
            headerName: 'key',
            flex: 1, UpdateSecret,
            cellClassName: 'name-column--cell'
        },
        {
            field:'requestId',
            headerName: 'requestId',
            flex: 1,
            cellClassName: 'name-column--cell'


        },
        {
            field:'data',
            headerName: 'data',
            flex: 1,
            cellClassName: 'name-column--cell'


        },

        {
            field:'valueKind',
            headerName: 'ValueKind',
            flex: 1,
            cellClassName: 'name-column--cell'


        },
        {
            field:'createdTime',
            headerName: 'createdTime',
            flex: 1,
            cellClassName: 'name-column--cell'


        },
        {
            field:'destroyed',
            headerName: 'destroyed',
            flex: 1,
            cellClassName: 'name-column--cell'


        },
        {
            field:'version',
            headerName: 'version',
            flex: 1,
            cellClassName: 'name-column--cell'


        },


        {
            field: 'management',
            headerName: 'manage secret',
            flex: 1,

            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <>
                    
                    <Button variant="outlined" color="secondary" onClick={() => handleUpdateSecret(params.row)}>Update</Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleDeleteSecret(params.row.secret)}>Delete</Button>
       
                  
                </>
            ),
        },




    ];


    const handleDeleteSecret = async (secret) => {

        try {

            const response = await axios.delete('https://localhost:2000/api/v1.0/kms/Secrets/DeleteSecret', {
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": 'application/json',
                }

            });

            if (response.status === 200) {
                console.log('secret deleted successfully');
            }
            else {
                console.log('failed to delete the secret');
            }
        } catch (error) {
            console.log('Error deleting the secret', error);
        }
    };


   
    let navigate2 = useNavigate();
    const routeChange2 = () => {
        navigate2('/updateSecret');
    }


  

    return (
        <Box m='20px'>
            <Header title="Secrets" subtitle="Data related to secret" />


            {selectedRow ? <UpdateSecret onGoBack={onGoBack} formData={selectedRow} /> :
                <Box m='40px 0 0 0' height='75vh' sx={{
                    '& .MuiDataGrid--root': {
                        border: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: 'none'
                    },
                    '& .name-column--cell': {
                        color: colors.greenAccent[300]
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: 'none'
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: colors.primary[400],

                    },

                    '& .MuiDataGrid-footerContainer': {
                        borderTop: 'none',
                        backgroundColor: colors.blueAccent[700]
                    },
                    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                        color: `${colors.grey[100]} !important`,

                    }
                }}>

                    <Box>
                        <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} />
                        
                    </Box>
                </Box>
            }


        </Box>



    );

};
export default DetailsSecret;
