import PropTypes from 'prop-types';
import {
  Box, CssBaseline, AppBar, Toolbar,
  Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Divider, IconButton
} from "@mui/material";
import {
  AttachMoney, Logout, Support, Dashboard, Menu, Inventory,
  ChevronLeft, AccountCircle
} from '@mui/icons-material';
import { useEffect, useState } from 'react'
import cookieFns from '../../../utils/cookieFns';
import FooterComponent from '../../../universalComponents/footer';

const drawerWidth = 240;

function DesktopLanding({ pathname, ChildComponent }) {
  const { eatCookie } = cookieFns();
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
          backgroundColor: '#9cbeff',
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
              <img src="/assets/hillbombcreations-logo.png" alt="HB Banner" style={{ width: '120px', height: 'auto' }} />
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
              <ListItem key='dashboard' disablePadding sx={{ color: pathname.includes('/') ? '#3780FF' : ''  }}>
                <ListItemButton onClick={() => window.location = '/'} sx={{ minHeight: 48 }}>
                  <ListItemIcon>
                    <Dashboard sx={{ color: pathname.includes('/') ? '#3780FF' : '' }}/>
                  </ListItemIcon>
                  {
                    open ?
                    <ListItemText primary='Dashboard' /> :
                    null
                  }
                </ListItemButton>
              </ListItem>
              <ListItem key='products' disablePadding sx={{ color: pathname.includes('/products') ? '#3780FF' : ''  }}>
                <ListItemButton onClick={() => window.location = '/products'} sx={{ minHeight: 48 }}>
                  <ListItemIcon>
                    <Inventory sx={{ color: pathname.includes('/products') ? '#3780FF' : '' }}/>
                  </ListItemIcon>
                  {
                    open ?
                    <ListItemText primary='Products' /> :
                    null
                  }
                </ListItemButton>
              </ListItem>
              <ListItem key='billing' disablePadding sx={{ color: pathname.includes('/billing') ? '#3780FF' : ''  }}>
                <ListItemButton
                  onClick={() => window.location = '/billing'}
                  sx={{ minHeight: 48 }}
                >
                  <ListItemIcon>
                    <AttachMoney sx={{ color: pathname.includes('/billing') ? '#3780FF' : '' }}/>
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
              <ListItem key='support' disablePadding sx={{ color: pathname.includes('/support') ? '#3780FF' : ''  }}>
                <ListItemButton onClick={() =>  window.location = '/support'} sx={{ minHeight: 48 }}>
                  <ListItemIcon>
                    <Support sx={{ color: pathname.includes('/support') ? '#3780FF' : '' }}/>
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
              <ListItem key='account' disablePadding sx={{ color: pathname.includes('/account') ? '#3780FF' : '' }}>
                <ListItemButton
                  onClick={() =>  window.location = '/account'}
                  sx={{ minHeight: 48, display: open ? 'flex' : null, flexDirection: open ? 'column' : null, alignItems: open ? 'center': null }}
                >
                  <ListItemIcon>
                    <AccountCircle sx={{ color: pathname.includes('/account') ? '#3780FF' : '', fontSize: open ? '60px' : null }}/>
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
            <ChildComponent user={user} contentWidth={open ? '80vw' : '90vw'} />
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
  ChildComponent: PropTypes.any,
}

export default DesktopLanding;
