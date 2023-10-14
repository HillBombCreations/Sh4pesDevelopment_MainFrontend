import React, { useEffect, useState, useRef } from 'react';
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
  Autocomplete,
  Tooltip
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

const GGTONERS_API_URL = 'https://api.ggtoners.com';

const DealsForm = (props) => {
  const { formType, existingDeal, token, closeDialog, mobile, replaceRowContent } = props;

  const Combo = useRef();

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [value, setValue] = useState('');
  const [dealID, setDealID] = useState('');
  const [productID, setProductID] = useState('');
  const [product, setProduct] = useState('');
  const [expirationDate, setExpirationDate] = useState(null);
  const [locked, setLocked] = useState(false);
  const [loading, toggleLoading] = useState(false);
  const [loadingDialog, toggleLoadingDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState('');
  const [productOptions, setProductOptions] = useState([]);

  useEffect(() => {
    if (props.existingDeal) {
      if (props.existingDeal.name) setName(props.existingDeal.name);
      if (props.existingDeal.type) setType(props.existingDeal.type);
      if (props.existingDeal.value) setValue(props.existingDeal.value);
      if (props.existingDeal.dealID) setDealID(props.existingDeal.dealID);
      if (props.existingDeal.productID) {
        setProduct(props.existingDeal.productID);
        setProductID(props.existingDeal.productID);
      }
      if (props.existingDeal.expirationDate) setExpirationDate(props.existingDeal.expirationDate);
      if (props.existingDeal.locked) setLocked(props.existingDeal.locked);
    }
  }, [props.existingDeal])

  const updateDeal = async () => {
    try {
      const updatedDeal = { _id: existingDeal._id, name, type, value, dealID, productID, locked, expirationDate };
      await axios.put(`${GGTONERS_API_URL}/deals/updateDeal`, updatedDeal, { headers: { 'Authorization': `Basic ${token}` } });
  
      setDialogContent('Successfully updated deal details.');
      toggleLoading(false);
      replaceRowContent(updatedDeal);
    } catch (err) {
      if (err.response.data?.errorMessage) setDialogContent(err.response.data.errorMessage);
      toggleLoading(false);
    }
  }
  const createNewDeal = async () => {
    try {
      await axios.post(`${GGTONERS_API_URL}/deals/addDeal`, {
        name, type, value, dealID, productID, locked, expirationDate
      }, { headers: { 'Authorization': `Basic ${token}` } });
  
      setDialogContent('Successfully created new deal.');
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
      setDialogContent('Updating deal.');
      updateDeal();
    } else if (formType === 'create') {
      setDialogContent('Creating new deal.');
      createNewDeal();
    }
    toggleLoadingDialog(true);
  }
  const handleDateChange = (newValue) => {
    setExpirationDate(newValue || null);
  };
  const grabProductOptions = async (search) => {
    try {
      let url = `${GGTONERS_API_URL}/products?limit=10&skip=0&sort=productName&direction=ascending&tableType=admin&productName=${search}`;
      const { data } = await axios.get(url);
      setProductOptions(data.results.map(obj => { return { label: obj.productName, _id: obj._id, sku: obj.sku }}));
    } catch (err) {
      console.log(err);
    }
  }
  const onBlur = (e) => {
    Combo.current.inputValue = product;
  };
  const filterOptions = (options, state) => {
    return options;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField multiline value={name} onChange={(e) => {setName(e.target.value)}} fullWidth label='Name' />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField 
            inputProps={{ style: { textTransform: 'uppercase' } }}
            value={dealID}
            onChange={(e) => {setDealID(e.target.value?.toUpperCase())}}
            fullWidth
            label='Deal ID'
          />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              label='Type'
              onChange={(e) => {setType(e.target.value)}}
            >
              <MenuItem value={'%'}>%</MenuItem>
              <MenuItem value={'$'}>$</MenuItem>
            </Select>
          </FormControl>
          <TextField type='number' value={value} onChange={(e) => {setValue(e.target.value)}} fullWidth label='Value' />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Autocomplete
            fullWidth
            ref={Combo}
            onInputChange={(e) => {
              if (e?.target) {
                grabProductOptions(e.target.value);
              }
            }}
            onSelect={(e) => {
              const index = productOptions.map(op => op.label).indexOf(e.target.value);
              if (index >= 0) setProductID(productOptions[index].sku);
              setProduct(e.target.value);
            }}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            filterOptions={filterOptions}
            options={productOptions}
            onBlur={onBlur}
            clearOnBlur={false}
            value={product}
            renderOption={(props, option) => {
              return (
                <Tooltip
                  key={option._id}
                  style={{ marginLeft: '10px', marginRight: '10px' }}
                  placement='top'
                  title={<div style={{ textAlign: 'center', fontSize: '10pt' }}
                >
                  { option.label }
                </div>}>
                  <li style={{ display: 'flex', flexDirection: 'column' }} {...props}>
                    <div>{ option.label.slice(0, 30) }{ option.label.length > 30 ? '...' : null }</div>
                    <div style={{ fontSize: '10pt', color: 'rgba(0,0,0,0.75)' }}>{ option.sku }</div>
                  </li>
                </Tooltip>
              );
            }}
            renderInput={(params) => <TextField {...params} label='Product' />}
          />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {
              mobile ?
              <MobileDatePicker
                label='Expiration Date'
                inputFormat='MM/DD/YYYY'
                value={expirationDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
              :
              <DesktopDatePicker
                label='Expiration Date'
                inputFormat='MM/DD/YYYY'
                value={expirationDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            }
          </LocalizationProvider>
          <FormControl>
            <InputLabel>Locked</InputLabel>
            <Select
              value={locked}
              label='Locked'
              onChange={(e) => {setLocked(e.target.value)}}
            >
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack spacing={3}>
          <Button
            fullWidth
            disabled={!name || !type || !value || !dealID}
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

export default DealsForm;