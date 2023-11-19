import {
  Box,
  TextField,
  Button,
  Card,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react'
function DashboardPage({ email }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [accountError, setAccountError] = useState('');
  const [open, setOpen] = useState(false);
  const sendInquiryEmail = () => {
    setLoading(true);
    axios.post('https://api.sh4pesdevelopment.com/api/sendInquiryEmail',
    { email, message }
    ).then(res => {
      if (res.status === 201) {
        setLoading(false);
        setAccountError('success');
        setMessage('');
      } else {
        setLoading(false);
        setAccountError('error');
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      setAccountError('error');
      setLoading(false);
    });
  };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '15vw', paddingLeft: '15vw'}}>
        <h2 style={{ width: '480px', fontSize: '24px', color: '#3780FF', marginBottom: '15vh'}}>Dashboard</h2>
        <Box component="form" sx={{  display: 'flex', flexDirection: 'row' }} noValidate autoComplete="off">
          <Card raised sx={{ bgcolor: '#fffff', paddingY: '4vh', paddingX: '2vw', width: '30vw'}}>
            <>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    Create Inquiry
                </Button>
            </>
          </Card>
          <Dialog open={open} onClose={() => setOpen}>
              <DialogTitle>Inquire</DialogTitle>
              <DialogContent>
                  <DialogContentText sx={{ marginBottom: 0 }}>
                      Please give us a brief description of your inquiry
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                <div  style={{ bgcolor: '#fffff', paddingRight: '1vw', paddingLeft: '1vw', width: '30vw'}}>
                  {     
                      accountError === 'success' ? 
                        <Alert severity="success" sx={{ marginX: '2.6vw', marginBottom: '2vh' }}>
                          Support request successfully sent
                        </Alert> 
                      :
                      accountError === 'error' ?
                      <Alert severity="error" sx={{ marginX: '2.6vw', marginBottom: '2vh' }}>
                        There was a problem submiting inquiry, please reachout directly to hello@hbcreations.io
                      </Alert>
                      :
                      null

                  }
                  <TextField
                      required
                      fullWidth 
                      multiline
                      rows={4}
                      label="Description..."
                      value={ message }
                      error={!message}
                      onChange={(e) => setMessage(e.target.value)}
                      sx={{ marginBottom: '2vh' }}
                  />
                  {!loading ?
                    <>
                        <Button variant="contained" fullWidth disabled={ !message } onClick={sendInquiryEmail} sx={{ marginBottom: '2vh' }} >
                          Send Inquiry
                        </Button>
                    </>
                    :
                    <>
                        <CircularProgress
                            size={24}
                            sx={{
                            color: '#3780FF',
                            marginBottom: '2vh'
                            }}
                        />
                    </>
                  }
                </div>
              </DialogActions>
          </Dialog>
        </Box>
      </div>
    );
}
DashboardPage.propTypes = {
  email: PropTypes.string.isRequired,
}


export default DashboardPage;
