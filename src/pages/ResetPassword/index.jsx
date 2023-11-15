import { Component } from 'react';
import PropTypes from 'prop-types';
import DesktopView from './Desktop'
import MobileView from './Mobile'

export default class ResetPasswordPage extends Component {
  static propTypes = {
    pathname: PropTypes.any,
    email: PropTypes.any,
  };
  constructor(props) {
    super(props)
    this.state = {
      width: window.innerWidth,
    };
  }

  handleWindowSizeChange() {
    this.setState({ width: window.innerWidth });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', this.handleWindowSizeChange);
    }
  }
  render() {
    const { pathname, email } = this.props;
    return (
      <div id="page-container">
        {
          this.state.width <= 768 ? 
          <MobileView pathname={pathname} email={email} />
          :
          <DesktopView pathname={pathname} email={email} />
        }
      </div>
    );
  }
}