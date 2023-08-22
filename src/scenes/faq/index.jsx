import { Box ,List,ListItem,ListItemText,Typography,useTheme} from "@mui/material";
import { Accordion } from '@mui/material';
import {AccordionSummary }from "@mui/material";
import {AccordionDetails }from "@mui/material";

import { ExpandMore } from "@mui/icons-material";

import { tokens } from "../../theme";
import Header from "../../components/Header";
const FAQ =() => {
    const theme=useTheme();
    const colors=tokens(theme.palette.mode);
    return (
        <Box m='20px'>
            <Header title='FAQ' subtitle='Frequently asked Questions'/>
            <Accordion >
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                    Who are we?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    we are a dedicated team of professionals committed to providing secure and reliable solutions for data protection.
                     Our dashboard, which implements a Key Management System (KMS), is designed to safeguard your sensitive information and ensure the highest level of data security
                    </Typography>
                </AccordionDetails>
          


            </Accordion>




            <Accordion >
                <AccordionSummary expandIcon={<ExpandMore/>}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                    What are the system requirements for using the dashboard?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    The system requirements for our Dashboard are designed to ensure a smooth and secure user experience. 
                    You'll need a modern web browser, a stable internet connection, and a computer or device with sufficient memory and processing power.
                     For administrators, we recommend having access to a secure network environment, and we provide guidelines for optimal security configurations. 
                     Our Dashboard is designed to be user-friendly, but if you have specific technical requirements or questions, please don't hesitate to reach out to our support team for assistance."
                    </Typography>
                </AccordionDetails>
            </Accordion>


            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                    Can I access the dashboard from multiple devices?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    Yes, you can typically access the dashboard from multiple devices, provided you have the necessary permissions and access credentials.
                     Our system is designed to offer flexibility and convenience, allowing authorized users to securely access the dashboard from different devices such as laptops, desktops, tablets, and mobile phones.
                      This enables you to manage your key and secret resources from wherever you are, ensuring efficient and responsive control over your security assets. 
                      However, please remember to follow best practices for maintaining the security of your access credentials and ensure that your devices adhere to recommended security measures to protect sensitive data.
                    </Typography>
                </AccordionDetails>
            </Accordion>





            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                    Can I export data from the dashboard?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    Yes, you can typically export data from the dashboard, depending on the features and capabilities of your specific Key Management Server (KMS) software. 
                    Many KMS dashboards include functionality for exporting data and reports to various formats such as CSV (Comma-Separated Values), JSON (JavaScript Object Notation), or Excel spreadsheets.


                    </Typography>
                </AccordionDetails>
            </Accordion>






            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                    What is the dashboard's policy on privacy and data protection?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    We prioritize data security through our robust Key Management System (KMS).
                    It employs strong encryption, generates unique keys, securely stores them, and enables periodic key rotation. 
                    Access is strictly controlled, compliant with regulations, and subject to regular auditing. 
                    Disaster recovery and backup mechanisms ensure data availability and integrity
                    </Typography>
                </AccordionDetails>
            </Accordion>







        </Box>
    )

}
export default FAQ;