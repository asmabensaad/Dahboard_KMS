import {Box,Button,TextField} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useRef,useState,userRef,useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import instance from "../../api/axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import SendIcon from '@mui/icons-material/Send';
const REGISTER_URL = 'api/authenticate/register';
const initialValues ={
    username:'',
    email:'',
    ContactNumber:'', 
    password:''

};

const phoneRegExp=/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userSchema=yup.object().shape({
    username: yup.string().required("required"),
  
    email: yup.string().email("invalid email").required("required"),
    ContactNumber: yup
      .string().matches(phoneRegExp, "Phone number is not valid"),
    address1: yup.string(),
    password:yup.string().required("required"),
  
    
  });

const Form = () => {
    const isNonMobile=useMediaQuery('(min-width:600px)');
    const userRef=useRef();
     const errRef=useRef();
     const [username,setUsername]=useState('');
     const [snackbarOpen, setSnackbarOpen] = useState(false);
     const [email,setEmail]=useState('');
    const [ContactNumber,setContactNumber]=useState('');
     const [password,setPassword]=useState('');
     
     const [errMsg,setErrMsg]=useState('');
     const [success,setSuccess]=useState(false);


     const handleFormSubmit = async (values ,{resetForm})  => 
     { 
         try {
            const response =await instance.post(REGISTER_URL,values);
            console.log(JSON.stringify(response?.data))
            const roles=response?.data?.roles;
            setSnackbarOpen(true);
            resetForm();
           


        }catch (err)
        {if(!err?.response){
            setErrMsg('No Server Response');
        }else if(err.response?.status ===409){
            setErrMsg('Email Taken');
        }else {
            setErrMsg('Registration Failed');
        }
     
    }

    

    };
    const handleSnackbarClose = () => {
  
        setSnackbarOpen(false);
      };
    return (
        <Box m='20px'>
            <Header title="CREATE USER" subtitle="Create a New User Profile" />

           {success && <p>User created successsfuly !</p>} <Formik
            onSubmit={handleFormSubmit}
           initialValues={initialValues}
            validationSchema={userSchema}
             >
                {({ values,errors,touched,handleBlur,handleChange,handleSubmit,resetForm}) => (
                   <form onSubmit={handleSubmit}>
                    <Box display= 'flex'  gap='30px' flexDirection={'column'} 
                    sx={{
                        '& > div': { gridColumn: isNonMobile ? undefined : 'span4 '},
                    }}
                    >
 <TextField
                fullWidth
                variant="filled"
                type="text"
                label="User Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 2" }} />



<TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        error={!!touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                        sx={{ gridColumn:"span 4"}} />

                        


<TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Contact number"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.ContactNumber}
                        name="ContactNumber"
                        error={!!touched.ContactNumber && !!errors.ContactNumber}
                        helperText={touched.ContactNumber && errors.ContactNumber}
                        sx={{ gridColumn:"span 4"}} />

                        


<TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Adress1"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address1}
                        name="address1"
                        error={!!touched.address1 && !!errors.address1}
                        helperText={touched.address1 && errors.address1}
                        sx={{ gridColumn:"span 4"}} />







<TextField
                        fullWidth
                        variant="filled"
                        type="password"
                        label="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        name="password"
                        error={!!touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                        sx={{ gridColumn:"span 4"}} />



                    </Box>


                    <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="success" variant="contained" endIcon={<SendIcon />}>
                Create New User
              </Button>
              </Box>
 </form>
                )}
                

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
  User addesd successfully
</MuiAlert>
</Snackbar>


        </Box>
    );
};
export default Form;