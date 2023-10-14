import React, { Component } from 'react';
import axios from 'axios';
import { Search, Edit, Add, Refresh } from '@mui/icons-material';
import { Footer, Tabs } from '../universalComponents';
import {
  TableContainer, Table, TableHead, TableRow, TableCell,
  TableBody, Paper, TextField, InputAdornment, TablePagination, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Tooltip
} from '@mui/material';
import DealForm from './dealForm';
import dayjs from 'dayjs';

const GGTONERS_API_URL = 'https://api.ggtoners.com';

export default class Deals extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      limit: 10,
      skip: 0,
      sort: 'name',
      direction: 'decending',
      deals: [],
      loading: false,
      search: null,
      filters: [],
      totalDocs: 0,
      currentDeal: null,
      editDialog: false,
      createDialog: false,
      token: null
    };
  }

  grabDeals = async (filters, search, skipVal, sortVal, directionVal) => {
    try {
      const { limit, skip, sort, direction } = this.state;

      let url = `${GGTONERS_API_URL}/deals?limit=${limit}&skip=${skipVal ? skipVal : skip}&sort=${sortVal ? sortVal : sort}&direction=${directionVal ? directionVal : direction}&tableType=admin`;
      if (this.state.search || search) url = url + `&search=${this.state.search || search}`;
      if (filters) {
        filters.forEach(fil => {
          url = url + `&${fil.key}=${fil.val}`;
        })
      } else if (this.state.filters.length) {
        this.state.filters.forEach(fil => {
          url = url + `&${fil.key}=${fil.val}`;
        })
      }

      const { data } = await axios.get(url);
      this.setState({ deals: data.results, skip: skipVal ? Number(skipVal) : this.state.skip, loading: false, totalDocs: data.totalResults });
    } catch (err) {
      console.log(err);
    }
  }
  componentDidMount() {
    const { updateCurrentTab, mobile } = this.props;
    if (!mobile) updateCurrentTab(2);
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      if (c.includes('user=')) {
        const obj = c.replace('user=', '').trim();
        const userObj = JSON.parse(obj);
        
        this.setState({ token: userObj.token })
      }
    }
    
    this.grabDeals();
  }

  render() {
    const { currentTab, mobile } = this.props;

    const handleChangePage = (event, newPage) => {
      this.grabDeals(null, null, JSON.stringify(newPage));
    };
    const openEditDialog = (deal) => {
      this.setState({ currentDeal: deal, editDialog: true });
    }
    const toggleCreateDialog = () => {
      this.setState({ createDialog: !this.state.createDialog });
    }
    const toggleEditDialog = (bool) => {
      this.setState({ editDialog: bool });
    }
    const replaceRowContent = (rowObj) => {
      const newRows = this.state.deals.map(deal => {
        if (deal._id === rowObj._id) deal = rowObj;
        return deal;
      });
      this.setState({ deals: newRows });
    }
    return (
      <div style={{ flexDirection: 'column', display: 'flex', height: '100%' }}>
        {/* Navigation */}
        <div style={{ flex: '0 1 auto' }}>
          <Tabs currentTab={currentTab} mobile={mobile} />
        </div>
        {/* Main Content */}
        <div style={{ flex: '1 1 auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <div style={{ width: '80vw', display: 'flex', flexDirection: 'row' }}>
            <TextField
              sx={{
                fontStyle: 'italic', marginTop: '2vh', height: '55px', marginRight: 'auto', bgcolor: 'white',
                width: mobile ? '90%' : '45vw',
                '& label.Mui-focused': { color: 'black' },
                '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' }, '& fieldset': { borderColor: 'black' }, borderRadius: '5px' }
              }}
              label='Search by deal name'
              variant='outlined'
              value={this.state.search || ''}
              onChange={(e) => {this.setState({ search: e.target.value })}}
              onKeyDown={(e) => {
                if(e.key === 'Enter') {
                  this.setState({ loading: true, search: e.target.value, skip: 0, deals: [] });
                  this.grabDeals(null, e.target.value, '0');
                }
              }}
              InputProps={ mobile ? {
                startAdornment: (
                  <InputAdornment style={{ cursor: 'pointer' }} onClick={() => {
                    this.setState({ loading: true, skip: 0, deals: [] });
                    this.grabDeals(null, this.state.search, '0');
                  }} position='start'>
                    <Search />
                  </InputAdornment>
                )
              } : {
                endAdornment: (
                  <InputAdornment style={{ cursor: 'pointer' }} onClick={() => {
                    this.setState({ loading: true, skip: 0, deals: [] });
                    this.grabDeals(null, this.state.search, '0');
                  }} position='end'>
                    <Search />
                  </InputAdornment>
                )
              }}
            />
            <Tooltip style={{ marginLeft: '10px', marginRight: '10px' }} placement='top' title={<div style={{ textAlign: 'center', fontSize: '10pt' }}>
              Refresh Table
            </div>}>
              <IconButton
                onClick={() => {
                  this.setState({ deals: [] });
                  this.grabDeals();
                }}
                sx={{
                  '&:hover': { backgroundColor: 'rgba(13,149,242,0.5)' },
                  marginTop: 'auto', marginBottom: 'auto', color: 'white', backgroundColor: '#0D95F2'
                }}
                variant='contained'
              >
                <Refresh />
              </IconButton>
            </Tooltip>
            <Tooltip placement='top' title={<div style={{ textAlign: 'center', fontSize: '10pt' }}>
              Create New Deal
            </div>}>
              <IconButton
                onClick={toggleCreateDialog}
                sx={{
                  '&:hover': { backgroundColor: 'rgba(13,149,242,0.5)' },
                  marginTop: 'auto', marginBottom: 'auto', color: 'white', backgroundColor: '#0D95F2'
                }}
                variant='contained'
              >
                <Add />
              </IconButton>
            </Tooltip>
          </div>
          <div style={{ width: '80vw', marginTop: '3vh', marginBottom: '3vh' }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Deal Name</TableCell>
                    <TableCell align='right'>Deal ID</TableCell>
                    <TableCell align='right'>Value</TableCell>
                    <TableCell align='right'>Expiration Date</TableCell>
                    <TableCell align='right'></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.deals.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell
                        style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                        component='th'
                        scope='row'
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align='right'>{row.dealID || '--'}</TableCell>
                      <TableCell align='right'>{row.type === '$' ? '$' : null}{row.value || '--'}{row.type === '%' ? '%' : null}</TableCell>
                      <TableCell align='right'>{row.expirationDate ? dayjs(row.expirationDate).format('MM/DD/YYYY') : '--'}</TableCell>
                      <TableCell align='right'>
                        <Tooltip placement='top' title={<div style={{ textAlign: 'center', fontSize: '10pt' }}>
                          Edit
                        </div>}>
                          <IconButton
                            onClick={() => {openEditDialog(row)}}
                            sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.2)' }, marginTop: 'auto', marginBottom: 'auto', color: '#0D95F2' }}
                            variant='contained'
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10]}
              component='div'
              count={this.state.totalDocs}
              rowsPerPage={this.state.limit}
              page={this.state.skip}
              onPageChange={handleChangePage}
            />
          </div>
        </div>
        {/* Footer */}
        <div style={{ flex: '0 1 auto' }}><Footer /></div>
        <Dialog open={this.state.editDialog} onClose={() => {toggleEditDialog(false)}} fullWidth maxWidth='md'>
          <DialogTitle>Edit Deal</DialogTitle>
          <DialogContent>
            <DealForm
              replaceRowContent={replaceRowContent}
              mobile={mobile}
              token={this.state.token}
              formType={'edit'}
              existingDeal={this.state.currentDeal}
            />
          </DialogContent>
          <DialogActions>
            <Button variant='contained' onClick={() => {toggleEditDialog(false)}}>Close</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.state.createDialog} onClose={toggleCreateDialog} fullWidth maxWidth='md'>
          <DialogTitle>Create Deal</DialogTitle>
          <DialogContent>
            <DealForm mobile={mobile} token={this.state.token} formType={'create'} closeDialog={toggleCreateDialog} />
          </DialogContent>
          <DialogActions>
            <Button variant='contained' onClick={toggleCreateDialog}>Close</Button>
          </DialogActions>
        </Dialog>
        {/* Graphics */}
        <div style={{
          width: mobile ? '10vw' : '4vw',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: mobile ? '5vw' : '2vw',
          background: 'linear-gradient(to right, #0D95F2 0%, #0D95F2 33%, #F80871 33%, #F80871 66%, #FFE001 66%, #FFE001 100%)',
          zIndex: -2
        }} />
      </div>
    )
  }
}
