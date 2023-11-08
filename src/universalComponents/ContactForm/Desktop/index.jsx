import { useEffect, useState } from 'react';
import ReactGA from "react-ga4";
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    CircularProgress,
} from "@mui/material";

function ContactForm() {
    const HBC_API = 'https://api.sh4pesdevelopment.com/api';

    const [searchParams] = useSearchParams();
    const [ref, setRef] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const refCode = searchParams.get("ref");
        if (refCode) setRef(refCode)
    }, [searchParams]);

    const sendEmail = async () => {
        const res = await axios.post(`${HBC_API}/sendInquiryEmail`, { firstName, lastName, email, message, ref });
        if (res.status === 201) {
            setRef('');
            setMessage('');
            setEmail('');
            setLastName('');
            setFirstName('');
            setOpen(true);
        }
    };
    const handleClose = () => {
        setOpen(false);
    }
    const useAnalyticsEventTracker = async () => {
        setLoading(true);
        await sendEmail();
        ReactGA.event({ category: 'Contact Us', action: 'emailInquiry' });
        setLoading(false);
    };

    return (
        <div style={{ marginLeft: 'auto' }}>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'row' }} noValidate autoComplete="off">
                    <div style={{ flexDirection: 'columm', width: '100%'}}>
                        <TextField
                            label="Referral Code/Referrer"
                            sx={{ paddingRight: '10px', marginBottom: '2vh' }}
                            value={ ref }
                            onChange={(e) => setRef(e.target.value)}
                        />
                        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '2vh', justifyContent: 'space-evenly' }}>
                            <TextField
                                fullWidth
                                label="First Name"
                                sx={{ paddingRight: '10px' }}
                                value={ firstName }
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Last Name"
                                value={ lastName }
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <TextField
                            required
                            label="Email"
                            fullWidth
                            sx={{ marginBottom: '2vh' }}
                            value={ email }
                            error={!email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            required
                            fullWidth 
                            multiline
                            rows={4}
                            label="Your inquiry..."
                            value={ message }
                            error={!message}
                            onChange={(e) => setMessage(e.target.value)}
                            sx={{ marginBottom: '2vh' }}
                        />
                        {!loading ?
                        <>
                            <Button variant="contained" disabled={ !email || !message } onClick={useAnalyticsEventTracker} >
                                Submit Request
                            </Button>
                        </>
                        :
                        <>
                            <CircularProgress
                                size={24}
                                sx={{
                                color: '#5688e0',
                                }}
                            />
                        </>
                        }
                    </div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Success!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Thank you for reaching out to us! Your inquiry has been successfully received. We will review it and get back to you as soon as possible. If you have any urgent questions, please feel free to contact us directly at hello@hbcreations.io
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} fullWidth variant="contained">Ok</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    );
}
export default ContactForm;