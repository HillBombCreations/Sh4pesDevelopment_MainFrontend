import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
	Box,
	TextField,
	Button,
	Card,
	CircularProgress,
	Alert,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Tooltip,
	DialogContentText,
	IconButton,
	ListItemText,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { socket } from '../../../../socket';

function DashboardPage({ email }) {
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [projects, setProjects] = useState(false);
	const [accountError, setAccountError] = useState('');
	const [open, setOpen] = useState(false);

	useEffect(() => {
    socket.on('new-project', (newProject) => {
		console.log(newProject);
      if (newProject.to === email) setProjects([...projects, newProject]);
    });

		axios
			.get('http://localhost:5000/api/user/projects', {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status === 200) {
					setLoading(false);
					setProjects(res.data);
				} else {
					const error = new Error(res.error);
					throw error;
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	const sendInquiryEmail = () => {
		setLoading(true);
		axios
			.post('http://localhost:5000/api/sendInquiryEmail', { email, message })
			.then((res) => {
				if (res.status === 201) {
					setLoading(false);
					setAccountError('success');
					setMessage('');
					setOpen(false);
					setTimeout(() => {
						setAccountError('');
					}, 5000);
				} else {
					setLoading(false);
					setAccountError('error');
					const error = new Error(res.error);
					throw error;
				}
			})
			.catch((err) => {
				console.error(err);
				setAccountError('error');
				setLoading(false);
			});
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<h2
				style={{
					fontSize: '24px',
					color: '#3780FF',
				}}
			>
				Dashboard
			</h2>
			<Box
				component="form"
				sx={{ display: 'flex', flexDirection: 'row' }}
				noValidate
				autoComplete="off"
			>
				<Card raised sx={{ bgcolor: '#fffff', padding: '1vw', width: '80vw' }}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'end',
						}}
					>
						<Tooltip
							title={
								<div>
									<span style={{ fontSize: '16px' }}>Create Inquiry</span>
								</div>
							}
						>
							<IconButton
								variant="contained"
								size="small"
								onClick={() => setOpen(true)}
							>
								<Add sx={{ color: '#3780FF' }} />
							</IconButton>
						</Tooltip>
					</div>
					{accountError === 'success' ? (
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
							}}
						>
							<Alert severity="success" sx={{ marginBottom: '2vh' }}>
								Inquiry Sent
							</Alert>
						</div>
					) : null}
					{projects.length ? (
						projects
							.sort(
								(a, b) =>
									new Date(a.createdAt).getTime() -
									new Date(b.createdAt).getTime()
							)
							.map((project, pIdx) => (
								<div
									key={`project_${pIdx}`}
									style={{ display: 'flex', flexDirection: 'column' }}
								>
									<div
										style={{
											width: '78vw',
											textAlign: 'left',
											display: 'flex',
										}}
									>
										<div style={{ width: '10%' }}>P_{pIdx + 1}</div>
										<div
											style={{
												width: '90%',
												textOverflow: 'ellipsis',
												overflow: 'hidden',
												whiteSpace: 'nowrap',
											}}
										>
											{project.text}
										</div>
									</div>
									{pIdx !== projects.length - 1 ? (
										<hr style={{ width: '100%', opacity: 0.3 }} />
									) : null}
								</div>
							))
					) : (
						<ListItemText secondary="no projects yet" />
					)}
				</Card>
				<Dialog open={open} onClose={() => setOpen(false)}>
					<DialogTitle>Inquire</DialogTitle>
					<DialogContent>
						<DialogContentText sx={{ marginBottom: 0 }}>
							Please give us a brief description of your inquiry
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<div
							style={{
								bgcolor: '#fffff',
								paddingRight: '1vw',
								paddingLeft: '1vw',
								width: '30vw',
							}}
						>
							{accountError === 'error' ? (
								<Alert severity="error" sx={{ marginBottom: '2vh' }}>
									There was a problem submiting inquiry, please reachout
									directly to hello@hbcreations.io
								</Alert>
							) : null}
							<TextField
								fullWidth
								multiline
								rows={4}
								label="Description..."
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								sx={{ marginBottom: '2vh' }}
							/>
							{!loading ? (
								<>
									<Button
										variant="contained"
										fullWidth
										disabled={!message}
										onClick={sendInquiryEmail}
										sx={{ marginBottom: '2vh' }}
									>
										Send Inquiry
									</Button>
								</>
							) : (
								<>
									<CircularProgress
										size={24}
										sx={{
											color: '#3780FF',
											marginBottom: '2vh',
										}}
									/>
								</>
							)}
						</div>
					</DialogActions>
				</Dialog>
			</Box>
		</div>
	);
}
DashboardPage.propTypes = {
	email: PropTypes.string.isRequired,
};

export default DashboardPage;
