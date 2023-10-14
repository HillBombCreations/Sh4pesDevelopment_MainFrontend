import { Box } from '@mui/material';
import React, { Component } from 'react';

export default class TabPanel extends Component {
  render() {
    const { children, value, index, ...other } = this.props;

    return (
      <div role='tabpanel' hidden={value !== index} {...other}>
        {value === index && (
          <Box sx={{ p: 3 }}>
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }
}
