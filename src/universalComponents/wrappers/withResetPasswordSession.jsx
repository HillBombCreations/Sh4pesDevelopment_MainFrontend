import { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import axios from 'axios';

export default function withPasswordResetSession(ComponentToProtect, path) {
  return class WithPasswordResetSession extends Component {
    static propTypes = {
      match: PropTypes.any,
    };
    constructor() {
      super();
      this.state = {
        loading: true,
        redirectBool: false,
        email: '',
      };
    }
    componentDidMount() {
      const splitPath = path.split('/');
      const diff = splitPath[splitPath.length - 1] ? 1 : 2;
      const email = splitPath[splitPath.length - diff];
      const id = splitPath[splitPath.length - diff - 1];
      axios.post(
        `https://api.hbcreations.io/api/user/checkResetPasswordSession?id=${id}&email=${email}`,
        {
          withCredentials: true,
        }
      ).then(res => {
          if (res.status === 200) {
            this.setState({ loading: false, email });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirectBool: true });
        });
    }
    render() {
      const { loading, redirectBool } = this.state;
      if (loading) {
        return null;
      }
      if (redirectBool) {
        window.location.replace('/404');
        return <CircularProgress />;
      }
      return <ComponentToProtect email={this.state.email} />;
    }
  }
}