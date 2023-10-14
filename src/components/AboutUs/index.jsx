import React, { Component } from 'react';
import axios from 'axios';
import { Footer, Tabs } from '../universalComponents';
import { socket } from '../../socket';
import {
  TableContainer, Table, TableHead, TableRow, TableCell,
  TableBody, Paper, TablePagination
} from '@mui/material';

const GGTONERS_API_URL = 'https://api.ggtoners.com';

export default class BotResults extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      limit: 10,
      skip: 0,
      sort: 'createdAt',
      direction: 'decending',
      botResults: [],
      loading: false,
      totalDocs: 0,
      token: null,
    };
  }
  newBatch = (value) => {
    const newArray = [...value.results, ...this.state.botResults];
    this.setState({ botResults: newArray });
  }
  grabResults = async (skipVal, sortVal, directionVal) => {
    try {
      const { limit, skip, sort, direction } = this.state;

      const url = `${GGTONERS_API_URL}/botResults?limit=${limit}&skip=${skipVal ? skipVal : skip}&sort=${sortVal ? sortVal : sort}&direction=${directionVal ? directionVal : direction}`;

      const { data } = await axios.get(url);
      this.setState({ bots: data.results, skip: skipVal ? Number(skipVal) : this.state.skip, loading: false, totalDocs: data.totalResults });
    } catch (err) {
      console.log(err);
    }
  }
  componentDidMount() {
    const { updateCurrentTab, mobile } = this.props;
    socket.on('new-bot-result-batch', this.newBatch);
  
    if (!mobile) updateCurrentTab(5);
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
    
    this.grabResults();
  }
  render() {
    const { currentTab, mobile } = this.props;

    const handleChangePage = (event, newPage) => {
      this.grabResults(JSON.stringify(newPage));
    };
    return (
      <div style={{ flexDirection: 'column', display: 'flex', height: '100%' }}>
        {/* Navigation */}
        <div style={{ flex: '0 1 auto' }}>
          <Tabs currentTab={currentTab} mobile={mobile} />
        </div>
        {/* Main Content */}
        <div style={{ flex: '1 1 auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <div style={{ width: '80vw', marginTop: '3vh', marginBottom: '3vh' }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell align='right'>Price</TableCell>
                    <TableCell align='right'>Seller</TableCell>
                    <TableCell align='right'>Seller Rating</TableCell>
                    <TableCell align='right'>Condition</TableCell>
                    <TableCell align='right'>Created At</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.botResults.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell
                        style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '25vw', minWidth: '25vw' }}
                        component='th'
                        scope='row'
                      >
                        {row.itemName}
                      </TableCell>
                      <TableCell style={{ maxWidth: '7vw', minWidth: '7vw' }} align='right'>{row.price?.allIn || '--'}</TableCell>
                      <TableCell style={{ maxWidth: '5vw', minWidth: '5vw' }} align='right'>{row.seller?.sellerName || '--'}</TableCell>
                      <TableCell style={{ maxWidth: '4vw', minWidth: '4vw' }} align='right'>{row.seller?.sellerRating || '--'}</TableCell>
                      <TableCell style={{ maxWidth: '4vw', minWidth: '4vw' }} align='right'>{row.condition || '--'}</TableCell>
                      <TableCell style={{ maxWidth: '7vw', minWidth: '7vw' }} align='right'>{row.createdAt || '--'}</TableCell>
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
