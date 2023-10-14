import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Stack,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Autocomplete
} from '@mui/material';

const GGTONERS_API_URL = 'https://api.ggtoners.com';

const printerOptions = [
  "MS/MX31x", "41x", "51x", "61x", "MS/MX310", "312", "315", "410", "415", "510", "511",
  "610", "611", "MX310", "MS/MX410", "MS/MX710", "711", "810", "812", "MS811", "817", "818",
  "MX717", "718", "811", "MS/MX331", "431", "MS/MX431", "MS/MX321", "421", "521", "622",
  "MX522", "MS621", "B/MB2338", "2442", "2546", "2650", "M/XM1242", "1246", "3250", "MS/MX521",
  "MS/MX421", "MS/MX725", "822", "826", "MS821", "823", "825", "B2865", "MB2770", "M5255",
  "5270", "XM5355", "5370", "7355", "7365", "7370", "MS823", "MX822", "CS/CX310", "CS310",
  "CS/CX410", "CS720", "CS/CX725", "CX310", "CX410", "B/MB2236", "B/MB2442", "MB3442adw",
  "MB3442i", "B3442dw", "B3340dw", "C/MC3224", "3326", "3426"
].sort();

const ProductsForm = (props) => {
  const { formType, existingProduct, token, closeDialog, replaceRowContent } = props;

  const [brand, setBrand] = useState('');
  const [archived, setArchived] = useState(false);
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [category, setCategory] = useState('');
  const [manageStock, setManageStock] = useState(true);
  const [sku, setSku] = useState('');
  const [taxableItem, setTaxableItem] = useState(true);
  const [productStatus, setProductStatus] = useState('');
  const [pageYield, setPageYield] = useState('');
  const [compatiblePrinters, setCompatiblePrinters] = useState([]);
  const [pcfPageYield, setPcfPageYield] = useState('');
  const [pcfCompatiblePrinters, setPcfCompatiblePrinters] = useState([]);
  const [afCost, setAfCost] = useState(0);
  const [dsCost, setDsCost] = useState(0);
  const [map, setMap] = useState(0);
  const [sellCode, setSellCode] = useState('');
  const [stockCode, setStockCode] = useState('');
  const [buyCode, setBuyCode] = useState('');
  const [url, setUrl] = useState('');
  //
  const [loading, toggleLoading] = useState(false);
  const [loadingDialog, toggleLoadingDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState('');

  useEffect(() => {
    if (props.existingProduct) {
      if (props.existingProduct.brand) setBrand(props.existingProduct.brand);
      if (props.existingProduct.archived) setArchived(props.existingProduct.archived);
      if (props.existingProduct.productName) setProductName(props.existingProduct.productName);
      if (props.existingProduct.productType) setProductType(props.existingProduct.productType);
      if (props.existingProduct.category) setCategory(props.existingProduct.category);
      if (props.existingProduct.manageStock) setManageStock(props.existingProduct.manageStock);
      if (props.existingProduct.sku) setSku(props.existingProduct.sku);
      if (props.existingProduct.taxableItem) setTaxableItem(props.existingProduct.taxableItem);
      if (props.existingProduct.productStatus) setProductStatus(props.existingProduct.productStatus);
      if (props.existingProduct.pageYield) setPageYield(props.existingProduct.pageYield);
      if (props.existingProduct.compatiblePrinters) setCompatiblePrinters(props.existingProduct.compatiblePrinters);
      if (props.existingProduct.pcfPageYield) setPcfPageYield(props.existingProduct.pcfPageYield);
      if (props.existingProduct.pcfCompatiblePrinters) setPcfCompatiblePrinters(props.existingProduct.pcfCompatiblePrinters);
      if (props.existingProduct.afCost) setAfCost(props.existingProduct.afCost);
      if (props.existingProduct.dsCost) setDsCost(props.existingProduct.dsCost);
      if (props.existingProduct.map) setMap(props.existingProduct.map);
      if (props.existingProduct.sellCode) setSellCode(props.existingProduct.sellCode);
      if (props.existingProduct.stockCode) setStockCode(props.existingProduct.stockCode);
      if (props.existingProduct.buyCode) setBuyCode(props.existingProduct.buyCode);
      if (props.existingProduct.url) setUrl(props.existingProduct.url);
    }
  }, [props.existingProduct])

  const updateProduct = async () => {
    try {
      const newProduct = {
        _id: existingProduct._id, sku, productName, brand, productType,
        category, manageStock, taxableItem, productStatus, pageYield,
        compatiblePrinters, pcfPageYield, pcfCompatiblePrinters, afCost,
        dsCost, map, sellCode, stockCode, buyCode, url, archived
      };
      await axios.put(`${GGTONERS_API_URL}/products/updateProduct`, newProduct, { headers: { 'Authorization': `Basic ${token}` } });
  
      setDialogContent('Successfully updated product details.');
      toggleLoading(false);
      replaceRowContent(newProduct);
    } catch (err) {
      if (err.response.data?.errorMessage) setDialogContent(err.response.data.errorMessage);
      toggleLoading(false);
    }
  }
  const createNewProduct = async () => {
    try {
      await axios.post(`${GGTONERS_API_URL}/products/addProduct`, {
        sku, productName, brand, productType,
        category, manageStock, taxableItem, productStatus, pageYield,
        compatiblePrinters, pcfPageYield, pcfCompatiblePrinters, afCost,
        dsCost, map, sellCode, stockCode, buyCode, url, archived
      }, { headers: { 'Authorization': `Basic ${token}` } });
  
      setDialogContent('Successfully created new product.');
      toggleLoading(false);
      closeDialog();
    } catch (err) {
      if (err.response.data?.errorMessage) setDialogContent(err.response.data.errorMessage);
      toggleLoading(false);
    }
  }
  const submitForm = () => {
    setDialogTitle('Submit');
    toggleLoading(true);
    if (formType === 'edit') {
      setDialogContent('Updating product.');
      updateProduct();
    } else if (formType === 'create') {
      setDialogContent('Creating new product.');
      createNewProduct();
    }
    toggleLoadingDialog(true);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField multiline value={productName} onChange={(e) => {setProductName(e.target.value)}} fullWidth label='Name' />
          <TextField value={brand} onChange={(e) => {setBrand(e.target.value)}} fullWidth label='Brand' />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField multiline value={productType} onChange={(e) => {setProductType(e.target.value)}} fullWidth label='Type' />
          <TextField value={category} onChange={(e) => {setCategory(e.target.value)}} fullWidth label='Category' />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField value={sku} onChange={(e) => {setSku(e.target.value)}} fullWidth label='SKU' />
          <FormControl fullWidth>
            <InputLabel>Manage Stock</InputLabel>
            <Select
              value={manageStock}
              label='Manage Stock'
              onChange={(e) => {setManageStock(e.target.value)}}
            >
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Taxable Item</InputLabel>
            <Select
              value={taxableItem}
              label='Taxable Item'
              onChange={(e) => {setTaxableItem(e.target.value)}}
            >
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField value={productStatus} onChange={(e) => {setProductStatus(e.target.value)}} fullWidth label='Status' />
          <TextField value={pageYield} onChange={(e) => {setPageYield(e.target.value)}} fullWidth label='Page Yield' />
          <TextField value={pcfPageYield} onChange={(e) => {setPcfPageYield(e.target.value)}} fullWidth label='PCF Page Yield' />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            type='number'
            value={map}
            onChange={(e) => {setMap(e.target.value)}}
            fullWidth
            label='MAP'
            InputProps={{
              startAdornment: <InputAdornment position='start'>$</InputAdornment>,
            }}
          />
          <TextField
            type='number'
            value={afCost}
            onChange={(e) => {setAfCost(e.target.value)}}
            fullWidth
            label='AF Cost'
            InputProps={{
              startAdornment: <InputAdornment position='start'>$</InputAdornment>,
            }}
          />
          <TextField
            type='number'
            value={dsCost}
            onChange={(e) => {setDsCost(e.target.value)}}
            fullWidth
            label='DS Cost'
            InputProps={{
              startAdornment: <InputAdornment position='start'>$</InputAdornment>,
            }}
          />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField value={sellCode} onChange={(e) => {setSellCode(e.target.value)}} fullWidth label='Sell Code' />
          <TextField value={stockCode} onChange={(e) => {setStockCode(e.target.value)}} fullWidth label='Stock Code' />
          <TextField value={buyCode} onChange={(e) => {setBuyCode(e.target.value)}} fullWidth label='Buy Code' />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField value={url} onChange={(e) => {setUrl(e.target.value)}} fullWidth label='Image URL' />
          <FormControl fullWidth>
            <InputLabel>Archived</InputLabel>
            <Select
              value={archived}
              label='Archived'
              onChange={(e) => {setArchived(e.target.value)}}
            >
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Autocomplete
            multiple
            freeSolo
            fullWidth
            value={compatiblePrinters}
            filterSelectedOptions
            options={printerOptions}
            onChange={(e, attr) => setCompatiblePrinters(attr)}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Compatible Printers'
                placeholder='Compatible Printers'
              />
            )}
          />
          <Autocomplete
            multiple
            freeSolo
            fullWidth
            value={pcfCompatiblePrinters}
            filterSelectedOptions
            options={printerOptions}
            onChange={(e, attr) => setPcfCompatiblePrinters(attr)}
            renderInput={(params) => (
              <TextField
                {...params}
                label='PCF Compatible Printers'
                placeholder='PCF Compatible Printers'
              />
            )}
          />
        </Stack>
        <Stack spacing={3}>
          <Button
            fullWidth
            disabled={!brand || !productName || !sku}
            variant='contained'
            onClick={submitForm}
          >Submit</Button>
        </Stack>
      </Stack>
      <Dialog open={loadingDialog} onClose={() => {toggleLoadingDialog(false)}} fullWidth maxWidth='sm'>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" component="div">
            {dialogContent}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' disabled={loading} onClick={() => {toggleLoadingDialog(false)}}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductsForm;