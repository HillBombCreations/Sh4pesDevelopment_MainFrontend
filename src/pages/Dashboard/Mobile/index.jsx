import Tabs from '../../../universalComponents/Tabs/Mobile';
import PropTypes from 'prop-types';

function MobileLanding({ pathname }) {
    return (
      <div id="page-container">
          <div id="content-wrap" style={{ padding: '10px 5vw 10px 5vw' }}>
            <header style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '10px', backgroundColor: '#3780FF' }}>
              <img src="/assets/Sh4pes.png" alt="Sh4pes Banner" style={{ width: '150px', marginLeft: 'auto', marginRight: 'auto' }} />
              <Tabs pathname={pathname} />
            </header>
            <div>Welcome</div>
            <div id="footer-content">
                <span style={{ marginRight: '10px', fontSize: '14px', color: '#333333' }}>© 2023 Sh4pes Development</span>
            </div>
        </div>
      </div>
    );
}

MobileLanding.propTypes = {
  pathname: PropTypes.string.isRequired,
}

export default MobileLanding;
