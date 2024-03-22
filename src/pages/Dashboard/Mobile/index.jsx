import PropTypes from 'prop-types';
import {
  ListItemIcon, IconButton, MenuItem,
  Dialog, Slide, Paper, Box
} from "@mui/material";
import {
  AttachMoney, Logout, Support, Dashboard,
  AccountCircle, Menu as MenuIcon, Close
} from '@mui/icons-material';
import { useEffect, useState, forwardRef } from 'react'
import cookieFns from '../../../utils/cookieFns';
import FooterComponent from '../../../universalComponents/footer';
import DashboardPage from './Dashboard';
import BillingPage from './Billing';
import SupportPage from './Support';
import AccountPage from './Account';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function DesktopLanding() {
  const { eatCookie } = cookieFns();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [pageType, setPageType] = useState('dashboard');
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const goToPage = (page) => {
    setPageType(page);
    setOpen(false);
  };
  useEffect(() => {
    const { serveCookie } = cookieFns();
    const userObj = serveCookie('user');
    setUser(JSON.parse(userObj));
  }, []);

  return (
    <div style={{
      position: 'fixed',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'flex-end'
    }}
    >
      <div style={{ position: 'absolute' }}>
        <IconButton
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleOpen}
          sx={{ bgcolor: 'transparent', width: '50px', height: '50px' }}
        >
          <MenuIcon style={{ width: '30px', height: '30px' }} />
        </IconButton>
      </div>
      <Box sx={{ height: '100vh', width: '100%' }}>
        <div>
          {
            user ?
              pageType === 'dashboard' ?
              <DashboardPage email={user?.email || ''} />
              : pageType === 'billing' ?
              <BillingPage user={user} />
              : pageType === 'support' ?
              <SupportPage email={user?.email} />
              : pageType === 'account' ?
              <AccountPage user={user} />
              : null
            : null
          }
        </div>
      </Box>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Paper sx={{ backgroundColor: "rgba(86, 136, 224, 1)", height: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
            <IconButton
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClose}
                sx={{ bgcolor: 'transparent', width: '50px', height: '50px' }}
              >
                <Close style={{ width: '30px', height: '30px' }} />
              </IconButton>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/assets/hill.png" alt="hill" style={{ width: '300px' }} />
            <MenuItem sx={{ color: pageType === 'dashboard' ? 'rgba(255, 255, 255, 1)': 'rgba(255, 255, 255, .7)', marginTop: '5vh', marginBottom: '10%', fontSize: '24px'}} onClick={() => goToPage('dashboard')}>
              <ListItemIcon>
                  <Dashboard sx={{ color: pageType === 'dashboard' ? 'rgba(255, 255, 255, 1)': 'rgba(255, 255, 255, .7)' }} />
              </ListItemIcon>
              Dashboard
            </MenuItem>
            <MenuItem sx={{ color: pageType === 'billing' ? 'rgba(255, 255, 255, 1)': 'rgba(255, 255, 255, .7)', fontSize: '24px', marginBottom: '10%' }} onClick={() => goToPage('billing')}>
              <ListItemIcon>
                  <AttachMoney sx={{ color: pageType === 'billing' ? 'rgba(255, 255, 255, 1)': 'rgba(255, 255, 255, .7)' }} />
              </ListItemIcon>
              Billing
            </MenuItem>
            <MenuItem sx={{ color: pageType === 'support' ? 'rgba(255, 255, 255, 1)': 'rgba(255, 255, 255, .7)', fontSize: '24px', marginBottom: '10%' }} onClick={() => goToPage('support')}>
              <ListItemIcon>
                  <Support sx={{ color: pageType === 'support' ? 'rgba(255, 255, 255, 1)': 'rgba(255, 255, 255, .7)' }} />
              </ListItemIcon>
              Support
            </MenuItem>
            <MenuItem sx={{ color: 'rgba(255, 255, 255, .7)', fontSize: '24px', marginBottom: '10%' }} onClick={eatCookie}>
              <ListItemIcon>
                  <Logout sx={{ color: 'rgba(255, 255, 255, .7)' }} />
              </ListItemIcon>
              Logout
            </MenuItem>
            <MenuItem sx={{ color: pageType === 'account' ? 'rgba(255, 255, 255, 1)': 'rgba(255, 255, 255, .7)', fontSize: '24px', marginBottom: '10%' }} onClick={() => goToPage('account')}>
              <ListItemIcon>
                  <AccountCircle sx={{ color: pageType === 'account' ? 'rgba(255, 255, 255, 1)': 'rgba(255, 255, 255, .7)' }} />
              </ListItemIcon>
              { user?.name }
            </MenuItem>
          </div>
        </Paper>
      </Dialog>
        <div style={{ position: 'absolute', bottom: '0', width: '100%' }}>
          <FooterComponent />
        </div>
      </div>
  );
}

DesktopLanding.propTypes = {
  pathname: PropTypes.string.isRequired,
}

export default DesktopLanding;
