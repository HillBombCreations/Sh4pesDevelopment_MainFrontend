import { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, ImageList, ImageListItem } from '@mui/material';
import axios from 'axios';

const HB_API_URL = 'https://api.hbcreations.io/api/tenant';

export default class Products extends Component {
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
          this.setState({ loading: false });
        } else {
          this.setState({ products: [], skip: 0, loading: false });
        }
      } catch (err) {
        console.log(err);
      }
    }
    handleScroll = event => {
      if (event.target.scrollHeight - event.target.scrollTop < 800 && !this.state.loading) {
        this.setState({ loading: true });
        this.grabProducts();
      }
    }

    componentDidMount() {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      if (params.search) {
        this.setState({ loading: true, search: params.search });
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
      return (
        <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '2vh', height: '85vh' }}>
          <div style={{ marginLeft: '25px', marginRight: '25px' }}>
            <ImageListItem style={{ display: 'flex', flexGrow: 1, padding: '10px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
              <div style={{ width: contentWidth, display: 'flex', textAlign: 'left' }}>
                <div style={{ width: '30%' }}>Product Name</div>
                <div style={{ width: '10%' }}>MAP</div>
                <div style={{ width: '15%' }}>SKU</div>
                <div style={{ width: '10%' }}>Brand</div>
                <div style={{ width: '15%' }}>Product Type</div>
                <div style={{ width: '10%' }}>Manage Stock</div>
                <div style={{ width: '10%' }}>Status</div>
              </div>
            </ImageListItem>
            <ImageList id='imageList' cols={1} gap={0} sx={{ '::-webkit-scrollbar': { display: 'none' }, height: '95%' }}>
              {
                this.state.loading && !this.state.products.length ?
                <div style={{
                  color: '#90EE90',
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}>
                  <CircularProgress size={75} color='inherit' />
                </div>
                : this.state.products.length ?
                this.state.products.map((product, pIdx) => (
                  <div key={`${product.productName}${pIdx}`}>
                    <ImageListItem style={{ display: 'flex', flexGrow: 1, padding: '10px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                      <div style={{ width: contentWidth, display: 'flex', textAlign: 'left', fontSize: '11pt' }}>
                        <div style={{ width: '30%' }}>{product.productName}</div>
                        <div style={{ width: '10%' }}>${product.map}</div>
                        <div style={{ width: '15%' }}>{product.sku || '-'}</div>
                        <div style={{ width: '10%' }}>{product.brand || '-'}</div>
                        <div style={{ width: '15%' }}>{product.productType || '-'}</div>
                        <div style={{ width: '10%' }}>{product.manageStock ? 'Yes' : 'No'}</div>
                        <div style={{ width: '10%' }}>{product.productStatus || '-'}</div>
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
            </ImageList>
          </div>
        </div>
      );
    }
}
