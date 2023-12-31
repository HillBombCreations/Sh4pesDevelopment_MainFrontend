import { Component } from 'react';
import PropTypes from 'prop-types';
import DesktopView from './Desktop'
import MobileView from './Mobile'

export default class LandingPage extends Component {
  static propTypes = {
    pathname: PropTypes.any,
  };
  constructor(props) {
    super(props)
    this.state = {
      width: window.innerWidth
    };
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.setState({ width: window.innerWidth }));
    return () => {
      window.removeEventListener('resize', () => this.setState({ width: window.innerWidth }));
    }
  }
  render() {
    const { pathname } = this.props;
    return (
      <div>
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
