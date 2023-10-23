import { Box, TextField, Button } from "@mui/material";
import { useState } from 'react'; 
function SiteTabs() {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [message, setMessage] = useState();
    return (
        <div style={{ marginLeft: 'auto' }}>
            <Box
                component="form"
                sx={{
                    display: 'flex', flexDirection: 'row'
                }}
                noValidate
                autoComplete="off"
            >
                <div style={{ flexDirection: 'columm', width: '100%'}}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '2vh', justifyContent: 'space-evenly' }}>
                        <TextField
                            required
                            fullWidth
                            label="First Name"
                            sx={{ paddingRight: '10px' }}
                            value={ firstName }
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            required
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
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        required
                        fullWidth 
                        multiline
                        rows={4}
                        label="Your inquiry..."
                        value={ message }
                        onChange={(e) => setMessage(e.target.value)}
                        sx={{ marginBottom: '2vh' }}
                    />
                    <Button variant="outlined" >
                        Submit Request
                    </Button>
                </div>
            </Box>
        </div>
    );
}
export default SiteTabs;