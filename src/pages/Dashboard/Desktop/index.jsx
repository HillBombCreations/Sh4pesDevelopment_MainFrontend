import PropTypes from 'prop-types';
import { Button } from "@mui/material";
import Tabs from '../../../universalComponents/Tabs/Desktop';
import cookieFns from '../../../utils/cookieFns';

function DesktopLanding({ pathname }) {
  const { eatCookie } = cookieFns();
  return (
    <div id="page-container">
      <div id="content-wrap" style={{ padding: '10px 20vw 10px 20vw' }}>
        <header style={{ display: 'flex', alignItems: 'center', marginBottom: 'auto', minHeight: '60px', backgroundColor: '#3780FF' }}>
          <img src="/assets/sh4pes.png" alt="Sh4pes Banner" style={{ position: 'absolute', width: '150px', marginRight: 'auto', top: '10px', left: '20%' }} />
          <Tabs pathname={pathname} />
        </header>
        <div>Welcome</div>
        <Button
          variant="contained"
          onClick={eatCookie}
          sx={{ marginBottom: '2vh', width: '25vw' }}
        >
          Log out
        </Button>
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
