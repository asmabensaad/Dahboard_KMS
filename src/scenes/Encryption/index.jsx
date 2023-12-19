import React, { useState } from 'react';
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Formik, Form, Field, useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import FormControl from '@mui/material/FormControl';
import Header from "../../components/Header";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import useMediaQuery from "@mui/material/useMediaQuery";
import buffer from 'buffer';
function Encryption() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery('(min-width:600px)');

const [result ,setResult]=useState();

  const validationSchema = Yup.object().shape({
    data: Yup.string().required('Data is required'),
  });

  const initialValues = {
    key: '',
    algorithm: '',
    data: '',
   
  };
  function convertStringToByteArray(str) {                                                                                                                                      
    var bytes = [];                                                                                                                                                             
    for (var i = 0; i < str.length; ++i) {                                                                                                                                      
      bytes.push(str.charCodeAt(i));                                                                                                                                            
    }                                                                                                                                                                           
    return bytes                                                                                                                                                                
  }

  const handleEncrypt = async (values) => {
    try{
      console.log('Sending key:', values.key);
      console.log(typeof values.key);
    //   const textEncoder = new TextEncoder();
    //   const keybyte = textEncoder.encode(values.key);
    // console.log(typeof keybyte);
    //  console.log('key:', keybyte);
      const response=await axios.post('http://localhost:2000/api/v1.0/encryption/Crypto/EncryptionData',{
        key: values.key,
        algorithm:values.algorithm,
        data:values.data,
      },
      {
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
     );
console.log(response.data);
      
      setResult(response.data.encryptedData);

    }catch(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with an error:', error.response.data);
        console.error('Status code:', error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Error setting up the request:', error.message);
    }
   

  }}
  const onSubmit = (values) => {
    handleEncrypt(values)
  }

  const form = useFormik({
    initialValues,
    onSubmit:handleEncrypt,
    validationSchema
  })
  

  return (
    <Box m='40px' display='flex' gap='30px' flexDirection={'column'}
      sx={{
        '& > div': { gridColumn: isNonMobile ? undefined : 'span4 ' },
      }}>
      <Header title="Encryption" subtitle="Data Encryption" />

      <Box>
        <FormikProvider value={form}>
          <form onSubmit={form.handleSubmit}>


            <Field
              type="text"
              name="data"
              component="textarea"
              placeholder="Data for encryption"
              onBlur={form.handleBlur}
              value={form.values.data}
              required
            />
            <Select
              value={form.values.algorithm}
              label="Algorithm"
              name="algorithm"
              onChange={form.handleChange}
            >
              <MenuItem value={"Hs256"}>Hs256

              </MenuItem>
              <MenuItem value={"Hs384"}>Hs384

              </MenuItem>
              <MenuItem value={"Hs512"}>Hs512


              </MenuItem>

              <FormHelperText></FormHelperText>

            </Select>


            <Field
              type="text"
              name="key"
              onBlur={form.handleBlur}
              value={form.values.key}

              placeholder="key for encryption"
            />
            <Button color="success" variant="contained" type="submit" >
              Encrypt
            </Button>
            <Field
              name="result"
              component="textarea"
              placeholder="Encrypted Result"
              value={result}
              readOnly
            />
          </form>
        </FormikProvider>
      </Box>

    </Box>
  )
}

export default Encryption;