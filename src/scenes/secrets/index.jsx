import { Box, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { number, object } from "yup";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import axios from "axios";
import { secretData } from "../../data/mockData";
import Header from "../../components/Header";
import './ListSecret.css';
import { useState, useEffect } from "react";
import UpdateSecret from "../updateSecret";
import DetailsSecret from "./DetailsSecret";
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from "react-router-dom";
import MuiAlert from '@mui/material/Alert';

const Secrets = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const colors = tokens(theme.palette.mode);
    const [selectedRow, setSelectedRow] = useState(null);
    const [rows, setRows] = useState([]);
    const [errMsg, setErrMsg] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
   
    const [selectedRowtoDetail, setSelectedRowToDetail] = useState(null);
   
    const handleShowDetailsSecret =  async (row) =>{
       
        setSelectedRowToDetail(row);
        navigate(`/secret/details/${row.key}`)
    };


    const handleUpdateSecret = (row) => {
        setSelectedRow(row);
    };
    const onGoBack = () => {
        setSelectedRow(null)
    }
    const handleSnackbarClose = () => {

        setSnackbarOpen(false);
      };


    const handleDeleteSecret=  async (row) => {
   
        try {
            const deleteUrl = `http://localhost:2000/api/v1.0/kms/Secrets/DeleteSecret`;

            await axios.delete(deleteUrl, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                params:{
                    alias:row.key
                }
            });
        
     
            setSelectedRow(null);
        setSnackbarOpen(true);

        
         } catch (error) {
                // Handle any errors that occur during the delete operation.
                console.error('Error deleting secret content:', error);
                setSnackbarOpen(false);
         }

    }
    const columns = [
        {
            field: 'key',
            headerName: 'secret',
            flex: 1, UpdateSecret,DetailsSecret,
            cellClassName: 'name-column--cell'
        },

        {
            field: 'management',
            headerName: 'Manage secret',
            flex: 1,

            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <>

                 <Button variant="outlined" color="secondary" onClick={() => handleShowDetailsSecret(params.row)}>Show Details</Button>
                 <Link to={`/secret/details/${params.row.key}`} style={{ textDecoration: 'none' }}></Link>

                 <Button variant="contained" color="success" onClick={() => handleUpdateSecret(params.row)}>Update</Button>
                 <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => handleDeleteSecret(params.row)}>Delete</Button>
              
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
                        <Button className='button' variant="contained" color="success"  onClick={routeChange}>Create New Secret</Button>
                    </Box>
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
          secret deleted successfully
        </MuiAlert>
      </Snackbar>




        </Box>



    );

};
export default Secrets;
