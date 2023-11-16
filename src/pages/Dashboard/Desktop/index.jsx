import PropTypes from 'prop-types';
import {
  Box, CssBaseline, AppBar, Toolbar,
  Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Divider, Container
} from "@mui/material";
import {
  Inbox, AttachMoney, Logout, Support, Dashboard
} from '@mui/icons-material';
import cookieFns from '../../../utils/cookieFns';

const drawerWidth = 240;

function DesktopLanding() {
  const { eatCookie } = cookieFns();
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar elevation={0} position="fixed" sx={{ backgroundColor: 'transparent', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Container maxWidth="100%">
            <Toolbar disableGutters>
              <img src="/assets/sh4pes_blue-bg_with-logo.png" alt="Sh4pes Banner" style={{ width: '150px', height: 'auto', marginLeft: '20px', marginTop: '30px' }} />
            </Toolbar>
          </Container>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto', paddingX: '15px', marginTop: '50px' }}>
            <List>
              <ListItem key='dashboard' disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Dashboard />
                  </ListItemIcon>
                  <ListItemText primary='Dashboard' />
                </ListItemButton>
              </ListItem>
              <ListItem key='billing' disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AttachMoney />
                  </ListItemIcon>
                  <ListItemText primary='Billing' />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider sx={{ backgroundColor: '#d9d8d8bf', width: '90%', marginX: 'auto' }} />
            <ListItem key='support' disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Support />
                </ListItemIcon>
                <ListItemText primary='Support' />
              </ListItemButton>
            </ListItem>
            <ListItem key='logout' disablePadding>
              <ListItemButton onClick={eatCookie}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary='Log out' />
              </ListItemButton>
            </ListItem>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
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
