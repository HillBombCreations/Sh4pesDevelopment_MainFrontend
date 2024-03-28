import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  CircularProgress, ImageList, ImageListItem, FormControl,
  InputLabel, OutlinedInput, InputAdornment, IconButton, Menu,
  MenuItem
} from '@mui/material';
import { Search, MoreHoriz } from '@mui/icons-material';
import axios from 'axios';

const HB_API_URL = 'https://api.hbcreations.io/api/tenant';

export default class DesktopProductsPage extends Component {
    static propTypes = {
      user: PropTypes.any,
      contentWidth: PropTypes.any,
    };
    constructor() {
      super();
      this.state = {
        limit: 20,
        skip: 0,
        sort: 'map',
        direction: 'decending',
        loading: false,
        products: [],
        search: null,
        filters: [],
        sortVal: 'map decending',
        done: false,
        anchorEl: null
      };
    }

    grabProducts = async (filters, search, skipVal, sortVal, directionVal) => {
      try {
        const { limit, skip, sort, direction } = this.state;
        const theSkipVal = skipVal ? skipVal : skip;

        let url = `${HB_API_URL}/products?limit=${limit}&skip=${theSkipVal}&sort=${sortVal ? sortVal : sort}&direction=${directionVal ? directionVal : direction}`;
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

        const { data } = await axios.get(url, { withCredentials: true });
        if (data.length > 0) {
          const uniqueArray = [...this.state.products, ...data].filter((value, index) => {
            const _value = JSON.stringify(value);
            return index === [...this.state.products, ...data].findIndex(obj => {
              return JSON.stringify(obj) === _value;
            });
          });
          this.setState({ products: uniqueArray, skip: Number(theSkipVal) + 1, loading: false });
        } else if (Number(theSkipVal) > 0) {
          this.setState({ loading: false, done: true });
        } else {
          this.setState({ products: [], skip: 0, loading: false, done: true });
        }
      } catch (err) {
        this.setState({ loading: false });
        console.log(err);
      }
    }
    handleScroll = event => {
      if (event.target.scrollHeight - event.target.scrollTop < 800 && !this.state.loading && !this.state.done) {
        this.setState({ loading: true, done: false });
        this.grabProducts();
      }
    }

    componentDidMount() {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      if (params.search) {
        this.setState({ loading: true, search: params.search, done: false });
        this.grabProducts(null, params.search);
      } else this.grabProducts();

      const element = document.getElementById('imageList');
      element.addEventListener('scroll', this.handleScroll, true);
    }
    componentWillUnmount() {
      const element = document.getElementById('imageList');
      element.removeEventListener('scroll', this.handleScroll);
    }

    render() {
      const { contentWidth } = this.props;

      const handleOpen = (index, event) => {
        const newProducts = this.state.products.map((p, i) => {
          if (i === index) p.open = true;
          return p;
        });
        this.setState({ products: newProducts, anchorEl: event.currentTarget });
      }
      const handleClose = (index) => {
        const newProducts = this.state.products.map((p, i) => {
          if (i === index) delete p.open;
          return p;
        });
        this.setState({ products: newProducts, anchorEl: null });
      }
      return (
        <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '2vh', height: '85vh' }}>
          <div style={{ marginLeft: '25px', marginRight: '25px', width: '100%' }}>
            {/* SEARCH BAR */}
            <FormControl sx={{ width: '30%', display: 'flex', marginBottom: '20px' }} variant="outlined">
              <InputLabel htmlFor="outlined-search-products">Search by brand or printer model</InputLabel>
              <OutlinedInput id="outlined-search-products"
                endAdornment={
                  <InputAdornment position="start" style={{ cursor: 'pointer' }} onClick={() => {
                    this.setState({ loading: true, skip: 0, products: [] });
                    this.grabProducts(null, this.state.search, '0');
                  }}>
                    <Search />
                  </InputAdornment>
                }
                value={this.state.search}
                onChange={(e) =>  this.setState({ search: e.target.value })}
                onKeyDown={(e) => {
                  if(e.key === 'Enter') {
                    this.setState({ loading: true, search: e.target.value, skip: 0, products: [] });
                    this.grabProducts(null, e.target.value, '0');
                  }
                }}
                label="Search by brand or printer model"
              />
            </FormControl>
            {/* PRODUCTS TABLE */}
            <ImageListItem style={{ padding: '10px', borderBottom: '1px solid rgba(0,0,0,0.5)' }}>
              <div style={{ width: contentWidth, display: 'flex', textAlign: 'left', fontWeight: 'bold' }}>
                <div style={{ width: '30%' }}>Product Name</div>
                <div style={{ width: '10%' }}>MAP</div>
                <div style={{ width: '15%' }}>SKU</div>
                <div style={{ width: '10%' }}>Brand</div>
                <div style={{ width: '15%' }}>Product Type</div>
                <div style={{ width: '10%' }}>Manage Stock</div>
                <div style={{ width: '5%' }}>Status</div>
                <div style={{ width: '5%' }}></div>
              </div>
            </ImageListItem>
            <ImageList id='imageList' cols={1} gap={0} sx={{ '::-webkit-scrollbar': { display: 'none' }, height: '85%' }}>
              {
                this.state.products.length ?
                this.state.products.map((product, pIdx) => (
                  <div key={`${product.productName}${pIdx}`}>
                    <ImageListItem style={{ padding: '5px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                      <div style={{ width: contentWidth, display: 'flex', textAlign: 'left', fontSize: '11pt', alignItems: 'center' }}>
                        <div style={{ width: '30%' }}>{product.productName}</div>
                        <div style={{ width: '10%' }}>${product.map}</div>
                        <div style={{ width: '15%' }}>{product.sku || '-'}</div>
                        <div style={{ width: '10%' }}>{product.brand || '-'}</div>
                        <div style={{ width: '15%' }}>{product.productType || '-'}</div>
                        <div style={{ width: '10%' }}>{product.manageStock ? 'Yes' : 'No'}</div>
                        <div style={{ width: '5%' }}>{product.productStatus || '-'}</div>
                        <div style={{ width: '5%' }}>
                          <IconButton onClick={(e) => handleOpen(pIdx, e)}>
                            <MoreHoriz />
                          </IconButton>
                          <Menu
                            anchorEl={this.state.anchorEl}
                            open={product.open}
                            onClose={() => handleClose(pIdx)}
                          >
                            <MenuItem style={{ fontSize: '10pt' }} onClick={() => handleClose(pIdx)}>
                              Edit product
                            </MenuItem>
                          </Menu>
                        </div>
                      </div>
                    </ImageListItem>
                  </div>
                ))
                :
                <div style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: 'rgba(0,0,0,0.4)',
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '12pt'
                }}>
                  no products to display
                </div>
              }
              {
                this.state.loading ?
                <div style={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: '15px'
                }}>
                  <CircularProgress size={25} />
                </div>
                : null
              }
            </ImageList>
          </div>
        </div>
      );
    }
}
