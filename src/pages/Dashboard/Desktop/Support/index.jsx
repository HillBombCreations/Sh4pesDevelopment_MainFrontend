import {
  Box,
  TextField,
  Button,
  Card,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, memo } from 'react'
const SupportPage = memo(function SupportPage({ email }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [accountError, setAccountError] = useState('');
  const sendSupportEmail = () => {
    setLoading(true);
    axios.post(
      'https://api.sh4pesdevelopment.com/api/sendSupportEmail',
      { to: email, message }
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
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: '15vw', paddingLeft: '15vw'}}>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '30vh', alignItems: 'center', paddingRight: '5vw' }}>
          <p style={{ width: '480px', fontSize: '24px', marginBottom: 0}}>We apologize for any inconveniences you may be facing. Let us know whats going on and we will respond to your message as soon as we can.</p>
        </div>
        <Box component="form" sx={{  display: 'flex', flexDirection: 'row', marginTop: '30vh' }} noValidate autoComplete="off">
          <Card raised sx={{ bgcolor: '#fffff', paddingY: '4vh', paddingX: '2vw', width: '30vw'}}>
            {     
                accountError === 'success' ? 
                  <Alert severity="success" sx={{ marginX: '2.6vw', marginBottom: '2vh' }}>
                    Support request successfully sent
                  </Alert> 
                :
                accountError === 'error' ?
                <Alert severity="error" sx={{ marginX: '2.6vw', marginBottom: '2vh' }}>
                  There was a problem submiting support, please reachout directly at support@hbcreations.io
                </Alert>
                :
                null

            }
            <TextField
                required
                fullWidth 
                multiline
                rows={4}
                label="Your message..."
                value={ message }
                error={!message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ marginBottom: '2vh' }}
            />
            {!loading ?
              <>
                  <Button variant="contained" disabled={ !message } onClick={sendSupportEmail} >
                      Submit Request
                  </Button>
              </>
              :
              <>
                  <CircularProgress
                      size={24}
                      sx={{
                      color: '#3780FF',
                      }}
                  />
              </>
            }
          </Card>
        </Box>
      </div>
    );
})
SupportPage.propTypes = {
  email: PropTypes.string.isRequired,
}


export default SupportPage;