import './createSecret.css';
import React, { useState } from 'react';
import {Box,Button,TextField} from "@mui/material";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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
  const isNonMobile=useMediaQuery('(min-width:600px)');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [secret, setSecret] = useState('');
  const [secretValue, setsecretValue] = useState([]);
  const [keyInput, setKeyInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [message, setMessage] = useState('');
  const [responseData, setResponseData] = useState(null);
  const handleKeyChange = (e) => {
    setKeyInput(e.target.value);
  };

  const handleValueChange = (e) => {
    setValueInput(e.target.value);
  };

  const addPair = () => {
    setsecretValue([...secretValue, { key: keyInput, value: valueInput }]);
    setKeyInput('');
    setValueInput('');
  };

  const removePair = (index) => {
    const updatedSecretValue = [...secretValue];
    updatedSecretValue.splice(index, 1);
    setsecretValue(updatedSecretValue);
  };
  const handleApiResponse=(data) => {
    setResponseData(data);
  }

  const secretValueObject=secretValue.reduce((acc,pair) => {
    acc[pair.key]=pair.value;
    return acc;
  },{});
  
  const sendData = async (e) => {
    e.preventDefault();
  

    try {
      const response = await fetch('http://localhost:2000/api/v1.0/kms/Secrets/CreateAsyncSecret', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          secret: secret,
          secretValue: secretValueObject
        })
      });

      if (response.status === 200 || response.status===201)  {
        const jsonData=await response.json();
        handleApiResponse(jsonData.data.data);
        console.log(handleApiResponse);
        setSecret('');
        setsecretValue(['']);
        setSnackbarOpen(false);

       
        
      } else {

       setMessage('error');

       
       
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const form=useFormik({
    initialValues:{
      secret:'',
      secretValue:[{key:'' ,value:''}],
    },onSubmit:sendData,
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
      <form onSubmit={sendData}>

      <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Secret name"
                            name="Secret name"
                            onBlur={form.handleBlur}
                            onChange={(e) => setSecret(e.target.value)}/>
                            


        {secretValue.map((pair, index) => (
          <div key={index}>
    <TextField 
            fullWidth
            variant="filled"
              type="text"
              value={pair.key}
              label="key"
              name="key"
              onBlur={form.handleBlur}
              onChange={(e) => {
                const updatedSecretValue = [...secretValue];
                updatedSecretValue[index].key = e.target.value;
                setsecretValue(updatedSecretValue);
              }}
            />

            <TextField
             fullWidth
             variant="filled"
              type="text"
              value={pair.value}
              placeholder="Value"
              onChange={(e) => {
                const updatedSecretValue = [...secretValue];
                updatedSecretValue[index].value = e.target.value;
                setsecretValue(updatedSecretValue);
              }}
            />

            <button type="button" onClick={() => removePair(index)}>Remove</button>
          </div>
        ))}

        <div>
          <input
            type="text"
            value={keyInput}
            placeholder="Key"
            onChange={handleKeyChange}

          />

          <input
            type="text"
            value={valueInput}
            placeholder="Value"
            onChange={handleValueChange}
          />

          <button type="button" onClick={addPair}>Add Pair</button>
          <button type="submit" >Create</button>
        </div>
        

        {message && <div className="message"><p>{message}</p></div>}
      </form>

      {responseData && responseData.data && (
        <div>
          <h2> API Response Data:</h2>
          <table>
            <thead>
              <tr>
                <th>secret</th>
                <th>key</th>
                <th>value</th>
                <th>metadata</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(responseData.data).map(([key,value]) =>
              <tr key={key}>
                <td>{secret}</td>
                <td>{key}</td>
                <td>{value.valueKind}</td>
                
              </tr>
              )}
            </tbody>
          </table>
          {responseData.data.metadata && (
            <>
          
          <h3>Metadata:</h3>
          <p>Created Time:{responseData.data.metadata.createdTime}</p>
          <p>Deletion Time: {responseData.data.metadata.deletionTime}</p>
          <p>Destroyed: {responseData.data.metadata.destroyed.toString()}</p>
          <p>Version: {responseData.data.metadata.version}</p>
          </>
          )}
        </div>
       
      )}
         

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
  User deleted successfully
</MuiAlert>
</Snackbar>

       
    </Box>

    );

 }
export default CreateSecret;               
                        
                        