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
                    What are the system requirements for using the dashboard?
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
                    Can I access the dashboard from multiple devices?
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
                    Can I export data from the dashboard?
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
                    we prioritize the security and protection of your data through the implementation of a robust Key Management System (KMS). 
                    Our KMS ensures the secure generation, storage, and management of encryption keys used to safeguard your sensitive information. 
                    Here are the key aspects of our policy:


                    Encryption and Key Generation: We employ strong encryption algorithms to protect your data during transit and at rest.
                     Our KMS generates unique encryption keys that are used to encrypt and decrypt your data, providing an additional layer of security.

                   Key Storage and Management: The encryption keys are securely stored within our KMS infrastructure. We follow industry best practices and employ stringent access controls to prevent unauthorized access to these keys. Our KMS also tracks key usage and provides audit logs for accountability.

                  key Rotation: To enhance security, our KMS supports key rotation, allowing for the periodic renewal of encryption keys. This ensures that even if a key is compromised, the exposure is limited and the impact is minimized.

                   Access Controls and Authorization: Only authorized personnel within our organization have access to the KMS. We enforce strict access controls and authentication mechanisms to ensure that only authorized individuals can manage and use the encryption keys.

                   Compliance and Auditing: Our KMS adheres to industry standards and regulatory requirements concerning data protection and privacy. We conduct regular audits to ensure compliance and continuously improve our security measures.

                  Disaster Recovery and Backup: We have implemented comprehensive disaster recovery plans and backup mechanisms to safeguard the availability and integrity of your data. Our KMS infrastructure is designed to handle potential failures and maintain the continuity of key management operations.
                    </Typography>
                </AccordionDetails>
            </Accordion>







        </Box>
    )

}
export default FAQ;