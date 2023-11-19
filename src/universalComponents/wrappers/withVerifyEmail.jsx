import { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import axios from 'axios';

export default function withVerifyEmail(ComponentToProtect, path) {
  return class WithVerifyEmail extends Component {
    static propTypes = {
      match: PropTypes.any,
    };
    constructor() {
      super();
      this.state = {
        loading: true,
        redirectBool: false,
      };
    }
    componentDidMount() {
      const splitPath = path.split('/');
      const diff = splitPath[splitPath.length - 1] ? 1 : 2;
      const id = splitPath[splitPath.length - diff];
      axios.post(`http://localhost:5000/api/user/verifyEmail?id=${id}`).then(res => {
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