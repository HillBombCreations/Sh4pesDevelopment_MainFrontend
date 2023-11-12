import { Component } from 'react';
import PropTypes from 'prop-types';
import DesktopView from './Desktop'
import MobileView from './Mobile'

export default class Login extends Component {
  static propTypes = {
    pathname: PropTypes.any,
  };
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: '',
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
    const { pathname } = this.props;
    return (
      <div id="page-container">
        {
          this.state.width <= 768 ? 
          <MobileView pathname={pathname} />
          :
          <DesktopView pathname={pathname} />
        }
      </div>
    );
  }
}