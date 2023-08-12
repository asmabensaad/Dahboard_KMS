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

const UpdateSecret = ({ formData, onGoBack }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const { secret, key, value, path } = formData


    const handleFormSubmit = (values) => {
        console.log(values);
    };
    const form = useFormik({
        initialValues: {
            secret,
            key,
            value,
            path,
        },
        onSubmit: handleFormSubmit
    })

    return (

                <form onSubmit={form.handleSubmit}>
                    <Box display='flex' gap='30px' flexDirection={'column'}
                        sx={{
                            '& > div': { gridColumn: isNonMobile ? undefined : 'span4 ' },
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="secret"
                            name="secret"
                            onBlur={form.handleBlur}
                            onChange={form.handleChange}
                            value={form.values.secret}


                        />

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Key"
                            onBlur={form.handleBlur}
                            onChange={form.handleChange}
                            name="key"
                            value={form.values.key}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="value"
                            onBlur={form.handleBlur}
                            onChange={form.handleChange}
                            name="value"
                            value={form.values.value}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="path"
                            onBlur={form.handleBlur}
                            onChange={form.handleChange}
                            name="path"
                            value={form.values.path}
                            readOnly
                            disabled
                        />


                    </Box>

                    <Box display="flex" justifyContent="end" gap={5} mt="20px">
                        <Button type="button" onClick={onGoBack} color="info" variant="contained">
                            Go back
                        </Button>
                        <Button type="submit" color="secondary" variant="contained">
                            Update Data
                        </Button>
                    </Box>

                </form>
    );
}
export default UpdateSecret;
