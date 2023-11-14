import { Component } from 'react';
import { CircularProgress } from '@mui/material';
import axios from 'axios';

export default function withPasswordResetSession(ComponentToProtect, queryParameters) {
  return class WithPasswordResetSession extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirectBool: false,
      };
    }
    componentDidMount() {
      const id = queryParameters.get('id');
      const email = queryParameters.get('email');
      axios.post(
        `https://api.sh4pesdevelopment.com/api/user/checkResetPasswordSession?id=${id}&email=${email}`,
        {
          withCredentials: true,
        }
      ).then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
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
      return <ComponentToProtect />;
    }
  }
}