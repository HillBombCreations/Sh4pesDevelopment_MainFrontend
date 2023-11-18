import PropTypes from 'prop-types';
import {
  Box, CssBaseline, AppBar, Toolbar,
  Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Divider, IconButton
} from "@mui/material";
import {
  AttachMoney, Logout, Support, Dashboard, Menu,
  ChevronLeft,
} from '@mui/icons-material';
import { useState } from 'react'
import cookieFns from '../../../utils/cookieFns';
import DashboardPage from './Dashboard';
import BillingPage from './Billing';
import SupportPage from './Support';
import AccountPage from './Account';
const drawerWidth = 240;

function DesktopLanding() { 
  const [pageType, setPageType] = useState('dashboard');
  const [open, setOpen] = useState(true);
  const { eatCookie } = cookieFns();

  const Component = () => {
    if (pageType === 'billing') return <BillingPage />;
    if (pageType === 'dashboard') return <DashboardPage />;
    if (pageType === 'account') return <AccountPage />;
    if (pageType === 'support') return <SupportPage />;
  };

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
        elevation={0}
        position="fixed"
        sx={{
          backgroundColor: '#3780FF',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          marginLeft: open ? drawerWidth : '',
          width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
        }}>
            <Toolbar>
              <IconButton
                color="#fffff"
                aria-label="open drawer"
                onClick={() => setOpen(true)}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
              >
                <Menu />
              </IconButton>
              <img src="/assets/sh4pes_blue-bg_with-logo.png" alt="Sh4pes Banner" style={{ width: '150px', height: 'auto' }} />
            </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            width: open ? drawerWidth : '4vw',
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            overflowX: 'hidden',
            [`& .MuiDrawer-paper`]: { width: open ? drawerWidth : '4vw', boxSizing: 'border-box', whiteSpace: 'nowrap', overflowX: 'hidden' },
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', overflowX: 'hidden'}}>
            <IconButton onClick={() => setOpen(false)} sx={{ marginTop: '1vh', marginRight: '1vw', marginBottom: 0, backgroundColor: '#3780FF' }}>
              <ChevronLeft />
            </IconButton>
          </div>
          <Toolbar />
          <Box sx={{ flexDirection: 'column', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
            <List>
              <ListItem key='dashboard' disablePadding sx={{ color: pageType === 'dashboard' ? '#3780FF' : ''  }}>
                <ListItemButton
                  onClick={() => setPageType('dashboard')}
                  sx={{ minHeight: 48 }}
                >
                  <ListItemIcon>
                    <Dashboard sx={{ color: pageType === 'dashboard' ? '#3780FF' : '' }}/>
                  </ListItemIcon>
                  {
                    open ?
                    <ListItemText primary='Dashboard' /> :
                    null
                  }
                </ListItemButton>
              </ListItem>
              <ListItem key='billing' disablePadding sx={{ color: pageType === 'billing' ? '#3780FF' : ''  }}>
                <ListItemButton
                  onClick={() => setPageType('billing')}
                  sx={{ minHeight: 48 }}
                >
                  <ListItemIcon>
                    <AttachMoney sx={{ color: pageType === 'billing' ? '#3780FF' : '' }}/>
                  </ListItemIcon>
                  {
                    open ?
                    <ListItemText primary='Billing' /> :
                    null
                  }
                </ListItemButton>
              </ListItem>
            </List>
            <Divider sx={{ backgroundColor: '#d9d8d8bf', width: open ? '90%' : '100%' }} />
            <ListItem key='support' disablePadding sx={{ color: pageType === 'support' ? '#3780FF' : ''  }}>
              <ListItemButton
                onClick={() =>  setPageType('support')}
                sx={{ minHeight: 48 }}
              >
                <ListItemIcon>
                  <Support sx={{ color: pageType === 'support' ? '#3780FF' : '' }}/>
                </ListItemIcon>
                {
                  open ?
                  <ListItemText primary='Support' /> :
                  null
                }
              </ListItemButton>
            </ListItem>
            <ListItem key='logout' disablePadding>
              <ListItemButton
                onClick={() => eatCookie}
                sx={{
                  minHeight: 48,
                }}
              >
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                {
                  open ?
                  <ListItemText primary='Log out' /> :
                  null
                }
              </ListItemButton>
            </ListItem>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {
            <Component />
          }
        </Box>
      </Box>
      <div style={{ position: 'absolute', bottom: '0', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span style={{ marginRight: '10px', fontSize: '14px', color: '#333333' }}>© 2023 Hill Bomb Creations</span>
          <span id="contact"><a style={{ color: '#333333' }} href="mailto:hello@hbcreations.io">hello@hbcreations.io</a></span>
        </div>
      </div>
    </div>
  );
}

DesktopLanding.propTypes = {
  pathname: PropTypes.string.isRequired,
}

export default DesktopLanding;
