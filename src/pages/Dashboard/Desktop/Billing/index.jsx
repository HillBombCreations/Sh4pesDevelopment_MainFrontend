import { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import axios from 'axios';

export default class Billing extends Component {
    static propTypes = {
      user: PropTypes.any,
    };
    constructor() {
      super();
      this.state = {
        loading: true
      };
    }
    componentDidMount() {
        const { user } = this.props;
        axios.get(
            `https://api.sh4pesdevelopment.com/api/user/createCustomerPortalSession?sID=${user.sID}`,
            { withCredentials: true }
        ).then(res => {
            if (res.status === 200) {
                this.setState({ loading: false });
                window.location.replace(res.data.url);
            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            console.error(err);
            this.setState({ loading: false });
        });
    }
    render() {
      const { loading } = this.state;
      if (loading) {
        return <CircularProgress />;
      }
      return null;
    }
}
