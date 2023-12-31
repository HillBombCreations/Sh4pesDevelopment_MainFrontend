import PropTypes from 'prop-types';
import {
  Box, CssBaseline, AppBar, Toolbar,
  Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Divider, IconButton
} from "@mui/material";
import {
  AttachMoney, Logout, Support, Dashboard, Menu,
  ChevronLeft, AccountCircle
} from '@mui/icons-material';
import { useEffect, useState } from 'react'
import cookieFns from '../../../utils/cookieFns';
import FooterComponent from '../../../universalComponents/footer';
import DashboardPage from './Dashboard';
import BillingPage from './Billing';
import SupportPage from './Support';
import AccountPage from './Account';

const drawerWidth = 240;

function DesktopLanding() {
  const { eatCookie } = cookieFns();
  const [pageType, setPageType] = useState('dashboard');
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const { serveCookie } = cookieFns();
    const userObj = serveCookie('user');
    setUser(JSON.parse(userObj));
  }, []);

  return (
    <div>
      <Box sx={{ display: 'flex', backgroundColor: '#e8f0ff', width: '100vw' }}>
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
                aria-label="open drawer"
                onClick={() => setOpen(true)}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
              >
                <Menu sx={{ color: '#FFFFFF'}} />
              </IconButton>
              <img src="/assets/sh4pes_blue-bg_with-logo.png" alt="Sh4pes Banner" style={{ width: '150px', height: 'auto' }} />
            </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            width: open ? drawerWidth : '3.5vw',
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            overflowX: 'hidden',
            [`& .MuiDrawer-paper`]: {
                width: open ? drawerWidth : '3.5vw',
                boxSizing: 'border-box',
                whiteSpace: 'nowrap',
                overflowX: 'hidden',
                backgroundColor: '#e8f0ff'
              },
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', overflowX: 'hidden'}}>
            <IconButton onClick={() => setOpen(false)} sx={{ marginTop: '1vh', marginRight: '1vw', marginBottom: 0, backgroundColor: '#3780FF' }}>
              <ChevronLeft sx={{ color: '#FFFFFF'}} />
            </IconButton>
          </div>
          <Toolbar />
          <Box sx={{ flexDirection: 'column', display: 'flex', height: '80%'}}>
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
            <List style={{ marginBottom: 'auto' }}>
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
                <ListItemButton onClick={eatCookie} sx={{ minHeight: 48 }}>
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
            </List>
            <List style={{ marginBottom: '3vh' }}>
              <ListItem key='account' disablePadding sx={{ color: pageType === 'account' ? '#3780FF' : '' }}>
                <ListItemButton
                  onClick={() =>  setPageType('account')}
                  sx={{ minHeight: 48, display: open ? 'flex' : null, flexDirection: open ? 'column' : null, alignItems: open ? 'center': null }}
                >
                  <ListItemIcon>
                    <AccountCircle sx={{ color: pageType === 'account' ? '#3780FF' : '', fontSize: open ? '60px' : null }}/>
                  </ListItemIcon>
                  { open && user?.name ? <ListItemText sx={{ marginTop: '10px' }} primary={user?.name} /> : null }
                  { open ? <ListItemText secondary={user?.email} /> : null }
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box sx={{ height: '100vh', width: '100%' }}>
          <Toolbar />
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
      </Box>
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
