import { Box, Button, useTheme, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { number } from "yup";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik, useFormik } from "formik";
import axios from "axios";
import Header from "../../components/Header";
import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import * as yup from "yup";


const phoneRegExp=/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userSchema=yup.object().shape({
    username: yup.string().required("required"),
  
    email: yup.string().email("invalid email").required("required"),
    ContactNumber: yup
      .string().matches(phoneRegExp, "Phone number is not valid"),
    address1: yup.string(),
   
  
    
  });

const UpdateTeam = ({ formData, onGoBack }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const [setMessage,setErrMsg]=useState();
    const [success,setSuccess]=useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const { username, email, contactNumber, id } = formData
    const handleFormSubmit = (values) => {
        console.log(values);
    };
    const handdleFormSubmit= async ({resetForm})=>{
       
        try{
         const response =await axios.post(`http://localhost:2023/api/Users/UpdateUser/${form.values.id}?&username=${form.values.username}&email=${form.values.email}&ContactNumber=${form.values.contactNumber}`,{
            id:form.values.id,
            username:form.values.username,
            email:form.values.email,
            contactNumber:form.values.contactNumber},
            {
             headers:{
                 
                 Authorization:`Bearer ${localStorage.getItem("token")}`,
             },
 
        
         });
         
         const data = response?.data || [];
         console.log(response.data);
 
         if (response.status === 200 || response.status===201)  {
             
             setSnackbarOpen(true);
             resetForm();
         }
 
             else {
 
                 setSnackbarOpen(false);}
 
     }
     catch (err)
     {
         if(!err?.response){
         setErrMsg('No Server Response');
     }else if(err.response?.status ===409){
        setErrMsg('Chek user Informations')
     }
  
 }
 };
    const form = useFormik({
        initialValues: {
            id,
            username,
            email,
            contactNumber,
            
        },
       
        onSubmit: handdleFormSubmit
    })

   

const handleSnackbarClose = () => {
  
    setSnackbarOpen(false);
  };
    

    return (
        <Box m='20px '>
             <Header title="Update User" subtitle="Manage Team Membre" />
             {success && <p> User updated successfully ! </p>} 

               <Formik  
                    validationSchema={userSchema}>
                      
                  {({ values,errors,touched,handleBlur,handleChange,handleSubmit,resetForm}) => (
                   <form onSubmit={form.handleSubmit}>
                    <Box display= 'flex'  gap='30px' flexDirection={'column'} 
                    sx={{
                        '& > div': { gridColumn: isNonMobile ? undefined : 'span4 '},
                    }}
                    >


                    
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="id"
                            name="id"
                            onBlur={form.handleBlur}
                            onChange={form.handleChange}
                            value={form.values.id}
                            readOnly
                            disabled
                            

                        />

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="username"
                            onBlur={form.handleBlur}
                            onChange={form.handleChange}
                            name="username"
                            value={form.values.username}
                            error={!!touched.username && !!errors.username}
                            helperText={touched.username && errors.username}
                            sx={{ gridColumn: "span 2" }}



                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="email"
                            onBlur={form.handleBlur}
                            onChange={form.handleChange}
                            name="email"
                            value={form.values.email}

                            error={!!touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                        sx={{ gridColumn:"span 4"}} 
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="contactNumber"
                            onBlur={form.handleBlur}
                            onChange={form.handleChange}
                            name="contactNumber"
                            value={form.values.contactNumber}
                            error={!!touched.ContactNumber && !!errors.ContactNumber}
                        helperText={touched.ContactNumber && errors.ContactNumber}
                        sx={{ gridColumn:"span 4"}} 
                            
                        />
                        

                    </Box>

                    <Box display="flex" justifyContent="end" gap={5} mt="20px">
                        <Button type="button" onClick={onGoBack} color="info" variant="contained">
                            Cancel
                        </Button>
                        <Button type="submit" color="secondary" variant="contained" >
                            Update Data
                        </Button>
                    </Box>
                    </form>

             
)
}
</Formik>
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
  User updated successfully
</MuiAlert>
</Snackbar>




   

</Box>
    );
};

export default UpdateTeam;
