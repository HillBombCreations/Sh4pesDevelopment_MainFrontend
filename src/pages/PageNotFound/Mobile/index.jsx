import { Component } from 'react';
import {
  Button,
} from "@mui/material";
import {
} from '@mui/icons-material';
import FooterComponent from '../../../universalComponents/footer';

export default class Login extends Component {

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h2 style={{ width: '280px', fontSize: '128px', color: '#3780FF', marginTop: '0', marginBottom: '0'}}>404</h2>
          <p style={{ width: '280px', fontSize: '20px', marginBottom: '0' }}>Yikes!</p>
          <p style={{ width: '280px', fontSize: '20px'}}>Looks like you wandered away a little too far, make your way back by clicking the button</p>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '4vw'}}>
            <img src="/assets/duck.png" alt="duck" style={{ width: '210px' }} />
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
          <FooterComponent />
        </div>
      </div>
    );
  }
}