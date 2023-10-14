import { Home, Menu as MenuIcon, Celebration, Print, AccountCircle, SportsKabaddi, Android, CelebrationOutlined } from '@mui/icons-material';
import { Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tab, Tabs } from '@mui/material';
import React, { Component } from 'react';
import formatStringFunctions from '../../utils/formatString';

export default class TabsComponent extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      menu: false,
      anchor: null,
      displayName: null,
      tabs: [
        { name: 'home', slug: '', icon: <Home /> },
        { name: 'aboutUs', slug: 'aboutUs', icon: <Print /> },
        { name: 'services', slug: 'services', icon: <Celebration /> },
        { name: 'portfolio', slug: 'portfolio', icon: <SportsKabaddi /> },
        { name: 'contactUs', slug: 'contactUs', icon: <Android /> },
      ]
    };
  }
  componentDidMount() {
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      if (c.includes('user=')) {
        const obj = c.replace('user=', '').trim();
        const userObj = JSON.parse(obj);
        this.setState({ displayName: `${userObj.firstName[0]}. ${userObj.lastName}` })
      }
    }
  }

  render() {
    const { currentTab, mobile } = this.props;
    const { capitalize } = formatStringFunctions();

    const openMenu = (event) => {
      this.setState({ menu: true, anchor: event.currentTarget });
    }
    const closeMenu = () => {
      this.setState({ menu: false, anchor: null });
    }
    const logout = () => {
      document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      window.location.replace('/login');
    }

    return (
      <div>
        <Box sx={{ borderBottom: 1, borderColor: 'transparent', margin: '0 10px 0 10px' }}>
          {
            mobile ?
              <div style={{ display: 'flex' }}>
                <div onClick={() => { window.location.replace('/') }} style={{ color: 'black', display: 'flex', fontFamily: 'Bookman Old Style' }}>
                  <img alt='ggIcon' style={{ height: '45px', width: '60px', marginTop: '10px' }} src={'../../assets/ggIcon.png'} />
                  <span style={{ marginLeft: '10px', fontWeight: 'bold', marginTop: 'auto', marginBottom: 'auto', fontSize: '15pt' }}>Toners</span>
                </div>
                <IconButton sx={{ marginLeft: 'auto', marginTop: '10px', color: '#000000' }} variant='contained' onClick={openMenu}>
                  <MenuIcon />
                </IconButton>
                <Menu anchorEl={this.state.anchor} open={this.state.menu} onClose={closeMenu}>
                  {
                    this.state.tabs.map(tab =>
                      <MenuItem
                        key={tab.slug}
                        onClick={
                          tab.name === 'login' && this.state.displayName ? logout
                          :
                          () => {window.location.replace(`/${tab.slug}`) }
                        }
                      >
                        <ListItemIcon>{tab.icon}</ListItemIcon>
                        <ListItemText primary={tab.name === 'login' && this.state.displayName ? 'Logout' : capitalize(tab.name)} />
                      </MenuItem>
                    )
                  }
                </Menu>
              </div>
              :
              <Tabs
                value={currentTab}
                indicatorColor='transparent'
                sx={{
                  paddingTop: '10px',
                  paddingX: '25px',
                  color: 'black !important',
                  position: 'relative',
                  height: '75px',
                  '& a': { borderRadius: 2 },
                  '& a:hover': { backgroundColor: '#D3D3D3' }
                }}
              >
                {
                  this.state.tabs.map((tab, index) => {
                    let content = (
                      <Tab href={`/${tab.slug}`} key={tab.slug}
                        style={{ borderBottom: currentTab === index ? '2px solid black' : null, fontSize: '12pt' }}
                        sx={{ marginLeft: index === 1 ? 'auto' : '2px', marginRight: index === this.state.tabs.length - 2 ? 'auto' : '2px', marginTop: '10px' }}
                        label={
                          <div style={{ color: 'black', fontFamily: 'Georgia,Times,Times New Roman,serif', fontWeight: 'bold' }}>
                            {capitalize(tab.name)}
                          </div>
                        }
                      />
                    )
                    if (tab.name === 'home') {
                      content = (
                        <Tab href='/' style={{ position: 'absolute' }} key='landing'
                          label={
                            <div style={{ color: 'black', display: 'flex', fontFamily: 'Bookman Old Style' }}>
                              <img alt='ggIcon' style={{ height: '45px', width: '60px' }} src={'../../assets/ggIcon.png'} />
                              <span style={{ marginLeft: '10px', fontWeight: 'bold', marginTop: 'auto', marginBottom: 'auto', fontSize: '15pt' }}>Toners</span>
                            </div>
                          }
                        />
                      )
                    } else if (tab.name === 'login') {
                      content = (
                        <Tab
                          href={this.state.displayName ? null : `/${tab.slug}`}
                          onClick={this.state.displayName ? logout : null}
                          key={tab.slug}
                          style={{ borderBottom: currentTab === index ? '2px solid black' : null, fontSize: '12pt', position: 'absolute', right: '3vw' }}
                          sx={{
                            marginLeft: index === 1 ? 'auto' : '2px',
                            marginRight: index === this.state.tabs.length - 1 ? 'auto' : '2px',
                            marginTop: '10px',
                            backgroundColor: 'white',
                            borderRadius: '10px'
                          }}
                          label={
                            <div style={{
                              color: 'black',
                              fontFamily: 'Georgia,Times,Times New Roman,serif',
                              fontWeight: 'bold',
                              display: 'flex',
                              alignContent: 'center',
                              alignItems: 'center'
                            }}>
                              {tab.icon}
                              <div style={{ marginLeft: '5px' }}>
                                { this.state.displayName ? 'Logout' : capitalize(tab.name) }
                              </div>
                            </div>
                          }
                        />
                      )
                    }
                    return content;
                  })
                }
              </Tabs>
          }
        </Box>
      </div>
    )
  }
}
