import { Box, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { number, object } from "yup";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import axios from "axios";
import { secretData } from "../../data/mockData";
import Header from "../../components/Header";
import './ListSecret.css';
import { useState, useEffect } from "react";
import UpdateSecret from "../updateSecret";
import DetailsSecret from "./DetailsSecret";
import { useParams } from "react-router-dom";


const Secrets = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const colors = tokens(theme.palette.mode);
    const [selectedRow, setSelectedRow] = useState(null);
    const [rows, setRows] = useState([]);
    const [errMsg, setErrMsg] = useState(false);
   
    const [selectedRowtoDetail, setSelectedRowToDetail] = useState(null);
   
    const handleShowDetailsSecret =  async (row) =>{
       
   
        navigate(`/secret/details/${row.key}`)
    };


    const handleUpdateSecret = (row) => {
        setSelectedRow(row);
    };
    const onGoBack = () => {
        setSelectedRow(null)
    }

    const columns = [
        {
            field: 'key',
            headerName: 'key',
            flex: 1, UpdateSecret,DetailsSecret,
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

                 <Button variant="outlined" color="secondary" onClick={() => handleShowDetailsSecret(params.row)}>Show Details</Button>

                    <Button variant="outlined" color="secondary" onClick={() => handleUpdateSecret(params.row)}>Update</Button>
              
                </>
            ),
        },
    ];
useEffect(() => {

        const displayData = async (e) => {

            try {

                const response = await axios.get('http://localhost:2000/api/v1.0/kms/Secrets/GetAllSecret', {
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": 'application/json',
                    },
                    params: {
                        mountPoint: 'kms'
                    }
                });
                
                const data = response?.data || [];
                const mappedData = data.keys.map((e, index) => {
                    return {
                        "id": index,
                        "key": e
                    }
                })
                setRows(mappedData);


            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 409) {
                    setErrMsg('NO DATA TO DISPLAY')
                }

            }
        };
        displayData();
    }, []);



    const routeChange = () => {
        navigate('/createsecret');
    }


    return (
        <Box m='20px'>
            <Header title="Secrets" subtitle="List Of Secrtes" />
            


            {selectedRow ?  (<UpdateSecret onGoBack={onGoBack} formData={selectedRow} />) :
            selectedRowtoDetail ?(<DetailsSecret selectedRowtoDetail={selectedRowtoDetail} />):
          
            
         
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
                        <Button className='button' variant="outlined" color="success" onClick={routeChange}>Create New Secret</Button>
                    </Box>
                </Box>
            }


        </Box>



    );

};
export default Secrets;
