import {
  Box,
  TextField,
  Button,
  Card,
  CircularProgress,
} from "@mui/material";
import { useState } from 'react'
function SupportPage() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const sendSupportEmail = () => {
    setLoading(true);
  };
    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: '15vw', paddingLeft: '15vw'}}>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '30vh', alignItems: 'center', paddingRight: '5vw'}}>
          <p style={{ width: '480px', fontSize: '24px', marginBottom: 0}}>We apologize for any inconveniences you may be facing. Let us know whats going on and we will respond to your message as soon as we can.</p>
        </div>
        <Box component="form" sx={{  display: 'flex', flexDirection: 'row', marginTop: '30vh' }} noValidate autoComplete="off">
          <Card raised sx={{ bgcolor: '#fffff', paddingY: '4vh', paddingX: '2vw', width: '30vw'}}>
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
