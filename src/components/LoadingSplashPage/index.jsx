import { CircularProgress } from '@mui/material';
import React, { Component } from 'react';

export default class LoadingSplash extends Component {
  render() {
    const { mobile } = this.props;

    return (
      <div style={{ flexDirection: 'column', display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontSize: mobile ? '25pt' : '35pt', fontWeight: 'bold', marginBottom: '1vh', textAlign: 'center' }}>Checking Credentials</div>
        <div style={{ fontSize: mobile ? '13pt' : '20pt', fontWeight: 'bold', marginBottom: '8vh', textAlign: 'center' }}>Wait just a moment</div>
        <CircularProgress size={250} />
      </div>
    )
  }
}
