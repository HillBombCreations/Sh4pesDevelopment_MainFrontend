import {
	Box,
	TextField,
	Button,
	Card,
	CircularProgress,
	Alert,
} from "@mui/material";
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react'

function DesktopSupportPage({ email }) {
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [accountError, setAccountError] = useState('');

	const sendSupportEmail = () => {
		setLoading(true);
		axios.post('https://api.hbcreations.io/api/sendSupportEmail',
			{ to: email, message }
		).then(res => {
			if (res.status === 201) {
				setLoading(false);
				setAccountError('success');
				setMessage('');
				setTimeout(() => {
							setAccountError('')
				}, 5000);
			} else {
				setLoading(false);
				setAccountError('error');
				const error = new Error(res.error);
				throw error;
			}
		})
		.catch(err => {
			console.error(err);
			setAccountError('error');
			setLoading(false);
		});
	};
	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'center' }}>
			<h2 style={{ width: '480px', fontSize: '24px', color: '#3780FF', marginBottom: '15vh'}}>Contact Support</h2>
			<div style={{ display: 'flex', flexDirection: 'row'}}>
				<img src="/assets/supportImage.png" alt="support" style={{ width: '380px', marginRight: '10vw' }} />
				<Box component="form" sx={{  display: 'flex', flexDirection: 'row' }} noValidate autoComplete="off">
					<Card raised sx={{ bgcolor: '#fffff', paddingY: '4vh', paddingX: '2vw', width: '30vw'}}>
						{     
							accountError === 'success' ? 
								<Alert severity="success" sx={{ marginX: '2.6vw', marginBottom: '2vh' }}>
									Support request successfully sent
								</Alert> 
								: accountError === 'error' ?
								<Alert severity="error" sx={{ marginX: '2.6vw', marginBottom: '2vh' }}>
									There was a problem submiting support, please reachout directly to support@hbcreations.io
								</Alert>
								: null
						}
						<p style={{ fontSize: '18px' }}>
							We apologize for any inconveniences you may be facing. Let us know whats going on and we will respond to your message as soon as we can.
						</p>
						<TextField
							required
							fullWidth 
							multiline
							rows={4}
							label="Your message..."
							value={ message }
							error={!message}
							onChange={(e) => setMessage(e.target.value)}
							sx={{ marginBottom: '2vh' }}
						/>
						{!loading ?
							<>
								<Button variant="contained" disabled={ !message } onClick={sendSupportEmail} >
									Submit Request
								</Button>
							</>
						:
						<>
							<CircularProgress size={24} sx={{ color: '#3780FF' }} />
						</>
						}
					</Card>
				</Box>
			</div>
		</div>
	);
}

DesktopSupportPage.propTypes = {
	email: PropTypes.string.isRequired,
}

export default DesktopSupportPage;
