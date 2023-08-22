import './createSecret.css';
import React, { useState } from 'react';
import { Box, Button, TextField } from "@mui/material";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FormikProvider, useFormik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import SendIcon from '@mui/icons-material/Send';
const validationSchema = Yup.object().shape({
  secret: Yup.string().required('Secret name is required'),
  secretValues: Yup.array().of(
    Yup.object().shape({
      key: Yup.string().required('Key is required'),
      value: Yup.string().required('Value is required'),
    })
  ),
});


function CreateSecret() {
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [secret, setSecret] = useState('');
  const [secretValue, setsecretValue] = useState([]);

  const [message, setMessage] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleApiResponse = (data) => {
    setResponseData(data);
  }



  const sendData = async (e) => {
    const resultObject = {};

    for (const obj of e.secretValue) {
      resultObject[obj.key] = obj.value;
    }
    try {
      const response = await fetch('http://localhost:2000/api/v1.0/kms/Secrets/CreateAsyncSecret', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          secret: e.secret,
          secretValue: resultObject
        })
      });

      if (response.status === 200 || response.status === 201) {
        const jsonData = await response.json();
        handleApiResponse(jsonData.data.data);
        console.log(handleApiResponse);
        setSecret('');
        setsecretValue(['']);
        setSnackbarOpen(true);


      } else {

        setMessage('error');
        setSnackbarOpen(false);



      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const form = useFormik({
    initialValues: {
      secret: '',
      secretValue: [{ key: '', value: '' }],
    }, onSubmit: sendData,
    validationSchema,
  })
  const handleSnackbarClose = () => {

    setSnackbarOpen(false);
  };


  return (
    <Box m='20px' display='flex' gap='30px' flexDirection={'column'}
      sx={{
        '& > div': { gridColumn: isNonMobile ? undefined : 'span4 ' },
      }}
    >
      <Header title="CREATE SECRET" subtitle="Create a New Secret " />

      <h1><p> Create new secret </p> </h1>

     <Box width={'50%'}>
     <FormikProvider value={form}>
        <Form>
          <TextField
            placeholder='Secrete name'
            name='secret'
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.secret}
            required
          />
          <FieldArray name='secretValue'>
            {
              ({ remove, push }) => (
                <div>
                  {form.values.secretValue.map((_, index) => (
                    <Box display={'flex'} gap={'1rem'} py={1}>
                      <TextField
                        placeholder='key'
                        name={`secretValue.${index}.key`}
                        onBlur={form.handleBlur}
                        onChange={form.handleChange}
                      />
                      <TextField
                        placeholder='value'
                        name={`secretValue.${index}.value`}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                      <Box display={'flex'} gap={'.5rem'} >

                        {
                          form.values.secretValue.length > 1 &&
                          <Button color="error" variant="contained" onClick={() => {
                            if (form.values.secretValue.length > 1)
                              remove(index)
                          }}  >
                            Remove
                          </Button>
                        }
                        {
                          form.values.secretValue.length - 1 === index &&
                          <Button color="secondary" variant="contained" onClick={() => {
                            if (form.values.secretValue.length < 3) {
                              push({ key: '', value: '' })
                            }
                          }} >
                            Add
                          </Button>
                        }
                      </Box>
                    </Box>
                  ))}
                </div>
              )
            }

          </FieldArray>
          <Button color='info' variant='contained'  endIcon={<SendIcon />}type='submit'>Create</Button>
        </Form>
      </FormikProvider>
     </Box>





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
          secret created successfully
        </MuiAlert>
      </Snackbar>


    </Box>

  );

}
export default CreateSecret;

