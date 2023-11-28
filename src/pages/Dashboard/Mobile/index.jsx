import PropTypes from 'prop-types';
import {
  ListItemIcon, IconButton, MenuItem,
  Menu, Fade
} from "@mui/material";
import {
  AttachMoney, Logout, Support, Dashboard,
  AccountCircle, Menu as MenuIcon
} from '@mui/icons-material';
import { useEffect, useState } from 'react'
// import cookieFns from '../../../utils/cookieFns';
import FooterComponent from '../../../universalComponents/footer';
// import DashboardPage from './Dashboard';
// import BillingPage from './Billing';
// import SupportPage from './Support';
// import AccountPage from './Account';


function DesktopLanding() {
  // const { eatCookie } = cookieFns();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const setMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
    setAnchorEl(null);
  };
  useEffect(() => {
    setUser({ name: 'Justin' });
    // const { serveCookie } = cookieFns();
    // const userObj = serveCookie('user');
    // setUser(JSON.parse(userObj));
  }, []);

  return (
    <div style={{
      position: 'fixed',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexWrap: 'wrap-reverse',
      flexDirection: 'row-reverse',
    }}
    >
      <div style={{ position: 'absolute', paddingRight: '10px', paddingBottom: '4vh' }}>
        {
          !open ?
          <IconButton
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={(e) => setMenu(e)}
              sx={{ bgcolor: '#3780FF', width: '50px', height: '50px' }}
            >
              <MenuIcon style={{ width: '30px', height: '30px' }} />
            </IconButton>
            :
            null
        }
      </div>
      <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          sx={
            {
              width: '100%',
              height: '100%',
              mt: "1px", "& .MuiMenu-paper": 
              { backgroundColor: "rgba(86, 136, 224, 1)", width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' },
            }
          }
          anchorEl={anchorEl}
          open={open}
          onClose={() => closeMenu()}
          TransitionComponent={Fade}
        >
          <img src="/assets/sh4pes.png" alt="Sh4pes" style={{ width: '300px' }} />
          <MenuItem sx={{ color: 'rgba(255, 255, 255, .7)', marginTop: '5vh', marginBottom: '10%', fontSize: '24px'}} onClick={() => console.log('PRESSED')}>
            <ListItemIcon>
                <Dashboard sx={{ color: 'rgba(255, 255, 255, .7)' }} />
            </ListItemIcon>
            Dashboard
          </MenuItem>
          <MenuItem sx={{ color: 'rgba(255, 255, 255, .7)', fontSize: '24px', marginBottom: '10%' }} onClick={() => console.log('PRESSED')}>
            <ListItemIcon>
                <AttachMoney sx={{ color: 'rgba(255, 255, 255, .7)' }} />
            </ListItemIcon>
            Billing
          </MenuItem>
          <MenuItem sx={{ color: 'rgba(255, 255, 255, .7)', fontSize: '24px', marginBottom: '10%' }} onClick={() => console.log('PRESSED')}>
            <ListItemIcon>
                <Support sx={{ color: 'rgba(255, 255, 255, .7)' }} />
            </ListItemIcon>
            Support
          </MenuItem>
          <MenuItem sx={{ color: 'rgba(255, 255, 255, .7)', fontSize: '24px', marginBottom: '10%' }} onClick={() => console.log('PRESSED')}>
            <ListItemIcon>
                <Logout sx={{ color: 'rgba(255, 255, 255, .7)' }} />
            </ListItemIcon>
            Logout
          </MenuItem>
          <MenuItem sx={{ color: 'rgba(255, 255, 255, .7)', fontSize: '24px', marginBottom: '10%' }} onClick={() => console.log('PRESSED')}>
            <ListItemIcon>
                <AccountCircle sx={{ color: 'rgba(255, 255, 255, .7)' }} />
            </ListItemIcon>
            { user?.name }
          </MenuItem>
        </Menu>
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
