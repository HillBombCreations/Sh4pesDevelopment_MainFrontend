import PropTypes from 'prop-types'
import DesktopView from './Desktop'
import MobileView from './Mobile'
function LandingPage({ pathname, isMobile }) {
    
    return (
      <div id="page-container">
        {
          isMobile ? 
          <MobileView pathname={pathname} />
          :
          <DesktopView pathname={pathname} />
        }
      </div>
    );
}

LandingPage.propTypes = {
  pathname: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
}
export default LandingPage;