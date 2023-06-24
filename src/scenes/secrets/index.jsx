import { Box ,useTheme } from "@mui/material";

import { tokens } from "../../theme";
import { number } from "yup";
import { DataGrid ,GridToolbar } from "@mui/x-data-grid";
import { secretData} from "../../data/mockData";
import Header from "../../components/Header";

const Secrets =() => {
const theme =useTheme();
const colors=tokens(theme.palette.mode);
const columns=[
    {field: 'id' , headerName:'ID',flex:0.5},

    { field:'secret' ,
     headerName:'secret Value ',
     flex :1 ,
     cellClassName:'name-column--cell' },

     { field:'key' ,
     headerName:'key',
     flex :1 ,
     cellClassName:'name-column--cell' },

     { field: 'value' ,
     headerName:'value',
     flex :1 ,
}
];
        return (
      <Box m='20px'>
    <Header title ="Secrets" subtitle="List Of Secrtes" />
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
        <DataGrid rows={secretData} columns={columns}  components={{Toolbar:GridToolbar}}/>
    </Box>
</Box>




);

};
export default Secrets;
