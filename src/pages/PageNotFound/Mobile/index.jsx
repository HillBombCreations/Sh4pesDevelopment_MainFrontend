import { Component } from 'react';
import {
  Button,
} from "@mui/material";
import {
} from '@mui/icons-material';

export default class Login extends Component {

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h2 style={{ width: '280px', fontSize: '128px', color: '#3780FF', marginTop: '0', marginBottom: '0'}}>404</h2>
          <p style={{ width: '280px', fontSize: '20px', marginBottom: '0' }}>Yikes!</p>
          <p style={{ width: '280px', fontSize: '20px'}}>Looks like you wandered away a little too far, make you way back by clicking the button</p>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '4vw'}}>
            <img src="/assets/duck.png" alt="Sh4pes" style={{ width: '210px' }} />
            <Button
                  variant="contained"
                  onClick={() => window.location.replace('/')}
                  sx={{ width: '10vw', height: '7vh', bgcolor: '#3780FF' }}
            >
                Home
            </Button>
          </div>
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