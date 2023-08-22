import { Box, Button, useTheme } from "@mui/material";
import { json, useNavigate } from "react-router-dom";
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
import { object } from "prop-types";


const DetailsSecret = () => {
    const theme = useTheme();
    const params = useParams()
    const colors = tokens(theme.palette.mode);
    const [selectedRow, setSelectedRow] = useState(null);
    const [errMsg, setErrMsg] = useState(false);
    const [secretDetails, setSecretDetails] = useState({});
    const [rows, setRows] = useState([]);

   
    const onGoBack = () => {
        setSelectedRow(null);
    };


    useEffect(() => {
        fetchDetails();
    }, []);
    const fetchDetails = async () => {

        try {

            const response = await axios.get('http://localhost:2000/api/v1.0/kms/Secrets/GetSecret',
                {
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": 'application/json',
                    },
                    params: {
                        alias: params.key
                    },
                });
            console.log(response);
            if (response.status === 200) {
                const jsonData = response.data;
                const dataRows =Object.entries(jsonData.data.data).map(([key,value]) => ({
                 id:  key,
                 key,
                valueKind:value.valueKind,
               
               
                renewable:jsonData.renewable,
                leaseDurationSeconds:jsonData.leaseDurationSeconds,
                createdTime: jsonData.data.metadata.createdTime,
                version: jsonData.data.metadata.version,
                destroyed: jsonData.data.metadata.destroyed,
              
                }));
                console.log(jsonData.data);
                
                setRows(dataRows);
        



            }
        }


        catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('NO DATA TO DISPLAY')
            }

        }


    };


    const columns = [
   
        {
            field: 'key',
            headerName: 'key',
            flex: 1,
            cellClassName: 'name-column--cell'
        },
        {
            field: 'valueKind',
            headerName: 'valueK ind',
            flex: 1,
        },
     
       
          {
            field: 'renewable',
            headerName: 'Renewable',
            flex: 1,
          },
          {
            field: 'leaseDurationSeconds',
            headerName: 'Lease Duration',
            flex: 1,
          },
          {
            field: 'destroyed',
            headerName: 'destroyed',
            flex: 1,
          },
          {
            field: 'createdTime',
            headerName: 'Created Time',
            flex: 2,
          },
          {
            field: 'version',
            headerName: 'Version',
            flex: 1,
          },

       



    ];





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

                    <Box  >
                    <div style={{ height: '75vh', width: '100%' }}>
                        <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} />
</div>
                    </Box>
                </Box>
            }


        </Box>



    );

};
export default DetailsSecret;
