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
  Autocomplete,
  Grid,
  DialogContentText
} from '@mui/material';

const GGTONERS_API_URL = 'https://api.ggtoners.com';

const UserForm = (props) => {
  const { existingUser, token, mobile, replaceRowContent } = props;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [active, setActive] = useState(true);
  const [address, setAddress] = useState({
    street1: '',
    street2: '',
    city: '',
    state: '',
    zip: ''
  });
  const [dealIDs, setDealIDs] = useState([]);
  const [loading, toggleLoading] = useState(false);
  const [loadingDialog, toggleLoadingDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState('');
  const [dealOptions, setDealOptions] = useState([]);

  useEffect(() => {
    grabDealOptions();
    if (props.existingUser) {
      if (props.existingUser.firstName) setFirstName(props.existingUser.firstName);
      if (props.existingUser.lastName) setLastName(props.existingUser.lastName);
      if (props.existingUser.email) setEmail(props.existingUser.email);
      if (props.existingUser.company) setCompany(props.existingUser.company);
      if (props.existingUser.phone) setPhone(props.existingUser.phone);
      if (props.existingUser.active) setActive(props.existingUser.active);
      if (props.existingUser.address) setAddress(props.existingUser.address);
      if (props.existingUser.dealIDs) setDealIDs(props.existingUser.dealIDs);
    }
  }, [props.existingUser])

  const updateUser = async () => {
    try {
      const updatedUser = {
        _id: existingUser._id, company, phone, active, address, dealIDs
      };
      await axios.put(`${GGTONERS_API_URL}/updateUser`, updatedUser, { headers: { 'Authorization': `Basic ${token}` } });
  
      setDialogContent('Successfully updated user details.');
      toggleLoading(false);
      replaceRowContent(updatedUser);
    } catch (err) {
      if (err.response.data?.errorMessage) setDialogContent(err.response.data.errorMessage);
      toggleLoading(false);
    }
  }
  const submitForm = () => {
    setDialogTitle('Submit');
    toggleLoading(true);
    setDialogContent('Updating user.');
    updateUser();
    toggleLoadingDialog(true);
  }
  const grabDealOptions = async (search) => {
    try {
      let url = `${GGTONERS_API_URL}/deals?limit=100&skip=0&sort=name&direction=ascending&tableType=admin&search=${search ? search : ''}`;
      const { data } = await axios.get(url);
      setDealOptions(data.results.map(obj => obj.dealID));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
      <Stack spacing={3} sx={{ width: '100%' }}>
        <fieldset>
          <legend style={{ paddingLeft: '3px', paddingRight: '3px' }}>User Details</legend>
          <Grid container spacing={2}>
            <Grid item xs={mobile ? 6 : 4}>
              <strong style={{ marginRight: '10px' }}>{firstName || '--'}</strong>
              <DialogContentText style={{ fontSize: '10pt' }}>First Name</DialogContentText>
            </Grid>
            <Grid item xs={mobile ? 6 : 4}>
              <strong style={{ marginRight: '10px' }}>{lastName || '--'}</strong>
              <DialogContentText style={{ fontSize: '10pt' }}>Last Name</DialogContentText>
            </Grid>
            <Grid item xs={mobile ? 6 : 4}>
              <strong style={{ marginRight: '10px' }}>{email || '--'}</strong>
              <DialogContentText style={{ fontSize: '10pt' }}>Email</DialogContentText>
            </Grid>
          </Grid>
        </fieldset>
        <br />
        <br />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField value={phone} onChange={(e) => {setPhone(e.target.value)}} fullWidth label='Phone' />
          <TextField multiline value={company} onChange={(e) => {setCompany(e.target.value)}} fullWidth label='Company' />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <FormControl sx={{ width: '10vw' }}>
            <InputLabel>Active</InputLabel>
            <Select
              value={active}
              label='Active'
              onChange={(e) => {setActive(e.target.value)}}
            >
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
          </FormControl>
          <Autocomplete
            multiple
            freeSolo
            fullWidth
            value={dealIDs}
            filterSelectedOptions
            options={dealOptions}
            onChange={(e, attr) => setDealIDs(attr)}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Deal IDs'
                placeholder='Deal IDs'
              />
            )}
          />
        </Stack>
        <Stack spacing={3}>
          <Button
            fullWidth
            variant='contained'
            onClick={submitForm}
          >Submit</Button>
        </Stack>
      </Stack>
      <Dialog open={loadingDialog} onClose={() => {toggleLoadingDialog(false)}} fullWidth maxWidth='sm'>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <Typography variant='subtitle1' component='div'>
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

export default UserForm;