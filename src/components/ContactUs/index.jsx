import React, { Component } from 'react';
import axios from 'axios';
import { Search, Edit, Add, Refresh, Download, UploadFile } from '@mui/icons-material';
import { Footer, Tabs } from '../universalComponents';
import {
  TableContainer, Table, TableHead, TableRow, TableCell,
  TableBody, Paper, TextField, InputAdornment, TablePagination, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Tooltip
} from '@mui/material';
import ProductForm from './productForm';

const GGTONERS_API_URL = 'https://api.ggtoners.com';

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      limit: 10,
      skip: 0,
      sort: 'map',
      direction: 'decending',
      products: [],
      loading: false,
      search: null,
      filters: [],
      totalDocs: 0,
      currentProduct: null,
      editDialog: false,
      createDialog: false,
      uploadDialog: false,
      token: null
    };
  }

  grabProducts = async (filters, search, skipVal, sortVal, directionVal) => {
    try {
      const { limit, skip, sort, direction } = this.state;

      let url = `${GGTONERS_API_URL}/products?limit=${limit}&skip=${skipVal ? skipVal : skip}&sort=${sortVal ? sortVal : sort}&direction=${directionVal ? directionVal : direction}&tableType=admin`;
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
      this.setState({ products: data.results, skip: skipVal ? Number(skipVal) : this.state.skip, loading: false, totalDocs: data.totalResults });
    } catch (err) {
      console.log(err);
    }
  }
  componentDidMount() {
    const { updateCurrentTab, mobile } = this.props;
    if (!mobile) updateCurrentTab(1);
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
    
    this.grabProducts();
  }

  render() {
    const { currentTab, mobile } = this.props;

    const handleChangePage = (event, newPage) => {
      this.grabProducts(null, null, JSON.stringify(newPage));
    };
    const openEditDialog = (product) => {
      this.setState({ currentProduct: product, editDialog: true });
    }
    const toggleCreateDialog = () => {
      this.setState({ createDialog: !this.state.createDialog });
    }
    const toggleEditDialog = (bool) => {
      this.setState({ editDialog: bool });
    }
    const uploadFile = async (event) => {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('bulkProducts', file);

      try {
        await axios.post(
          `${GGTONERS_API_URL}/products/bulkAdd`,
          formData,
          {
            headers: {
              'Authorization': `Basic ${this.state.token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        alert('Successful Bulk Upload');
      } catch (err) {
        alert('Something went wrong with your upload, place check your file and try again');
        console.log(err);
      }
    }
    const replaceRowContent = (rowObj) => {
      const newRows = this.state.products.map(product => {
        if (product._id === rowObj._id) product = rowObj;
        return product;
      });
      this.setState({ products: newRows });
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
              label='Search by brand or printer model'
              variant='outlined'
              value={this.state.search || ''}
              onChange={(e) => {this.setState({ search: e.target.value })}}
              onKeyDown={(e) => {
                if(e.key === 'Enter') {
                  this.setState({ loading: true, search: e.target.value, skip: 0, products: [] });
                  this.grabProducts(null, e.target.value, '0');
                }
              }}
              InputProps={ mobile ? {
                startAdornment: (
                  <InputAdornment style={{ cursor: 'pointer' }} onClick={() => {
                    this.setState({ loading: true, skip: 0, products: [] });
                    this.grabProducts(null, this.state.search, '0');
                  }} position='start'>
                    <Search />
                  </InputAdornment>
                )
              } : {
                endAdornment: (
                  <InputAdornment style={{ cursor: 'pointer' }} onClick={() => {
                    this.setState({ loading: true, skip: 0, products: [] });
                    this.grabProducts(null, this.state.search, '0');
                  }} position='end'>
                    <Search />
                  </InputAdornment>
                )
              }}
            />
            <Tooltip style={{ marginLeft: '5px', marginRight: '5px' }} placement='top' title={<div style={{ textAlign: 'center', fontSize: '10pt' }}>
              Refresh Table
            </div>}>
              <IconButton
                onClick={() => {
                  this.setState({ products: [] });
                  this.grabProducts();
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
            <Tooltip style={{ marginLeft: '5px', marginRight: '5px' }} placement='top' title={<div style={{ textAlign: 'center', fontSize: '10pt' }}>
              Create New Product
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
            <Tooltip style={{ marginLeft: '5px', marginRight: '10px' }} placement='top' title={<div style={{ textAlign: 'center', fontSize: '10pt' }}>
              Upload Spreadsheet
            </div>}>
              <IconButton
                sx={{
                  '&:hover': { backgroundColor: 'rgba(13,149,242,0.5)' },
                  marginTop: 'auto', marginBottom: 'auto', color: 'white', backgroundColor: '#0D95F2'
                }}
                variant='contained'
                component='label'
              >
                <input
                  onChange={uploadFile}
                  hidden
                  accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                  type='file'
                />
                <UploadFile />
              </IconButton>
            </Tooltip>
            <Tooltip placement='top' title={<div style={{ textAlign: 'center', fontSize: '10pt' }}>
              Download Template
            </div>}>
              <a style={{ marginBottom: 'auto', marginTop: 'auto' }} href={require('./ProductTemplate.csv')} download>
                <IconButton
                  sx={{
                    '&:hover': { backgroundColor: 'rgba(13,149,242,0.5)' },
                    color: 'white', backgroundColor: '#0D95F2'
                  }}
                  variant='contained'
                >
                  <Download />
                </IconButton>
              </a>
            </Tooltip>
          </div>
          <div style={{ width: '80vw', marginTop: '3vh', marginBottom: '3vh' }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell align='right'>Product Status</TableCell>
                    <TableCell align='right'>Brand</TableCell>
                    <TableCell align='right'>Category</TableCell>
                    <TableCell align='right'>SKU</TableCell>
                    <TableCell align='right'>Manage Stock</TableCell>
                    <TableCell align='right'>Taxable Item</TableCell>
                    <TableCell align='right'>MAP</TableCell>
                    <TableCell align='right'></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.products.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell
                        style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '25vw', minWidth: '25vw' }}
                        component='th'
                        scope='row'
                      >
                        {row.productName}
                      </TableCell>
                      <TableCell style={{ maxWidth: '7vw', minWidth: '7vw' }} align='right'>{row.productStatus || '--'}</TableCell>
                      <TableCell style={{ maxWidth: '4vw', minWidth: '4vw' }} align='right'>{row.brand || '--'}</TableCell>
                      <TableCell style={{ maxWidth: '7vw', minWidth: '7vw' }} align='right'>{row.category || '--'}</TableCell>
                      <TableCell style={{ maxWidth: '5vw', minWidth: '5vw' }} align='right'>{row.sku || '--'}</TableCell>
                      <TableCell style={{ maxWidth: '4vw', minWidth: '4vw' }} align='right'>
                        {row.manageStock ? 'Yes' : 'No'}
                      </TableCell>
                      <TableCell style={{ maxWidth: '4vw', minWidth: '4vw' }} align='right'>
                        {row.taxableItem ? 'Yes' : 'No'}
                      </TableCell>
                      <TableCell style={{ maxWidth: '4vw', minWidth: '4vw' }} align='right'>${row.map || '--'}</TableCell>
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
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            <ProductForm
              replaceRowContent={replaceRowContent}
              token={this.state.token}
              formType={'edit'}
              existingProduct={this.state.currentProduct}
            />
          </DialogContent>
          <DialogActions>
            <Button variant='contained' onClick={() => {toggleEditDialog(false)}}>Close</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.state.createDialog} onClose={toggleCreateDialog} fullWidth maxWidth='md'>
          <DialogTitle>Create Product</DialogTitle>
          <DialogContent>
            <ProductForm token={this.state.token} formType={'create'} closeDialog={toggleCreateDialog} />
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
