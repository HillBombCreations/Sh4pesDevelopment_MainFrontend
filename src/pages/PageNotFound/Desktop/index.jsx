import { Component } from 'react';
import {
  Button,
} from "@mui/material";
import {
} from '@mui/icons-material';

export default class Login extends Component {

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingRight: '15vw', paddingLeft: '15vw' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h2 style={{ width: '480px', fontSize: '128px', color: '#3780FF'}}>404</h2>
          <p style={{ width: '480px', fontSize: '24px', marginTop: '-10vh'}}>Yikes!</p>
          <p style={{ width: '480px', fontSize: '24px', marginTop: '-1vh', marginBottom: '10vh'}}>Looks like you wandered away a little too far, make you way back by clicking the button</p>
          <Button
                variant="contained"
                onClick={() => window.location.replace('/')}
                sx={{ width: '50%', bgcolor: '#3780FF' }}
          >
              Back To Home
          </Button>
        </div>
        <div style={{ position: 'absolute', bottom: '0' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span style={{ marginRight: '10px', fontSize: '14px', color: '#333333' }}>© 2023 Hill Bomb Creations</span>
            <span id="contact"><a style={{ color: '#333333' }} href="mailto:hello@hbcreations.io">hello@hbcreations.io</a></span>
          </div>
        </div>
      </div>
    );
  }
}