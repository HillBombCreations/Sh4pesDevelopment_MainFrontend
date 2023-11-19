import {
  Box,
  TextField,
  Button,
  Card,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from 'axios';
import { useState } from 'react'
function SupportPage() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [accountError, setAccountError] = useState('');
  const sendSupportEmail = () => {
    setLoading(true);
    axios.post(
      'http://localhost:5000/api/user/login',
      JSON.stringify({ email: this.state.email, password: this.state.password}),
      {
        headers: {
        'Content-Type': 'application/json'
        },
        withCredentials: true,
      }
    ).then(res => {
      if (res.status === 200) {
        setAccountError('200');
        document.cookie = `email=${this.state.email}`;
        window.location.replace('/');
      } else {
        this.setState({ loading: false });
        this.setState({ accountError: res.status.toString()});
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      if (err.response.status === 400 && err.response.data.error === 'Not verified') this.setState({ accountError: '400'});
      else if (err.response.status === 400 && err.response.data.error !== 'Not verified')  this.setState({ accountError: '402'});
      else this.setState({ accountError: err.response.status.toString()});
      this.setState({ loading: false });
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
                accountError === '200' ? 
                  <Alert severity="warning" sx={{ marginX: '2.6vw', marginBottom: '2vh' }}>
                    Please verify email to login
                  </Alert> 
                :
                accountError === '401' ?
                <Alert severity="error" sx={{ marginX: '2.6vw', marginBottom: '2vh' }}>
                  We cannot find an account associated with that email
                </Alert>
                :
                  accountError === '402' ?
                <Alert severity="error" sx={{ marginX: '2.6vw', marginBottom: '2vh' }}>
                  Please enter all fields
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
}


export default SupportPage;
