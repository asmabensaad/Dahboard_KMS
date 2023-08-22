import { Box, Button, useTheme, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { number } from "yup";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useState ,useEffect} from "react";
import SaveIcon from '@mui/icons-material/Save';
import { FormikProvider, useFormik, Formik,Form, FieldArray } from 'formik';
const UpdateSecret = ({ formData, onGoBack }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const params = useParams();
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const {  key} = formData
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [secret, setSecret] = useState('');
    const [secretValue, setsecretValue] = useState([]);
    const [responseData, setResponseData] = useState(null);
    const handleApiResponse = (data) => {
        setResponseData(data);
      }
    
     
  const updateSecret = async (e) => {
    const resultObject = {};

    for (const obj of e.secretValue) {
      resultObject[obj.key] = obj.value;
    }
    try {
      const response = await fetch(`http://localhost:2000/api/v1.0/kms/Secrets/UpdateSecretASync?keyAlias=${key}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
       Params:{
        keyAlias:key

       },
 
        body: JSON.stringify({
          resultObject
            })
      });

      if (response.status === 200 || response.status === 201) {
        const jsonData = await response.json();
        handleApiResponse(jsonData.data.data);
        console.log(handleApiResponse);
       
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
            key,
            secretValue: [{ key: '', value: '' }],
          
        },
        onSubmit: updateSecret
    })
    const handleSnackbarClose = () => {

        setSnackbarOpen(false);
      };

    return (<Box display='flex' gap='30px' flexDirection={'column'}
                        sx={{
                            '& > div': { gridColumn: isNonMobile ? undefined : 'span4 ' },
                        }}
                    >
                         <Header title="Update SECRET" subtitle="update  data" />
                         <Box width={'50%'}>
                        <FormikProvider value={form}>
                        <Form onSubmit={form.handleSubmit}>
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="secret"
                            onBlur={form.handleBlur}
                            onChange={form.handleChange}
                            name="key"
                            value={form.values.key}
                            readOnly
                            disabled
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
                   

                    <Box display="flex" justifyContent="end" gap={5} mt="20px">
                        <Button type="button" onClick={onGoBack} color="info" variant="contained">
                            Cancel
                        </Button>
                        <Button type="submit" color="secondary" variant="contained"    startIcon={<SaveIcon />}>
                           Save
                        </Button>
                    </Box>
                    

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
          secret updated successfully
        </MuiAlert>
      </Snackbar>
      </Box>
    );
}
export default UpdateSecret;
