import Tabs from '../../../universalComponents/Tabs/Desktop';
import PropTypes from 'prop-types';

function DesktopLanding({ pathname }) {
  return (
    <div id="page-container">
      <div id="content-wrap" style={{ padding: '10px 20vw 10px 20vw' }}>
        <header style={{ display: 'flex', alignItems: 'center', marginBottom: 'auto', minHeight: '60px', backgroundColor: '#3780FF' }}>
          <img src="/assets/Sh4pes.png" alt="Sh4pes Banner" style={{ position: 'absolute', width: '150px', marginRight: 'auto', top: '10px', left: '20%' }} />
          <Tabs pathname={pathname} />
        </header>
        <div>Welcome</div>
        <footer id="footer">
          <div style={{ color: '#333333' }} id="footer-content">
            <span style={{ marginRight: '10px' }}>© 2023 Sh4pes Development</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

DesktopLanding.propTypes = {
  pathname: PropTypes.string.isRequired,
}

export default DesktopLanding;
