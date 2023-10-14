import { Email } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import quickLinks from '../../utils/quickLinks';

const Footer = () => {
  const { openMail } = quickLinks();

  return (
    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}>
      <div style={{ color: 'black', display: 'flex', paddingBottom: '5px' }}>
        <img alt='ggIcon' style={{ height: '35px', width: '45px' }} src={'/assets/ggIcon.png'} />
        <span
          style={{
            marginLeft: '10px',
            marginRight: '10px',
            fontWeight: 'bold',
            marginTop: 'auto',
            marginBottom: 'auto',
            fontSize: '12pt',
            fontFamily: 'Bookman Old Style'
          }}
        >Toners</span>
      </div>
      <IconButton
        sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.2)' }, marginTop: 'auto', marginBottom: 'auto', color: '#000000' }}
        onClick={openMail}
        variant='contained'
      ><Email /></IconButton>
    </div>
  )
}

export default Footer;
