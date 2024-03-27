import { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';

export default class Products extends Component {
    static propTypes = {
      user: PropTypes.any,
    };
    constructor() {
      super();
      this.state = {
        loading: false
      };
    }
    render() {
      const { loading } = this.state;
      if (loading) {
        return <CircularProgress />;
      }
      return <div></div>;
    }
}
