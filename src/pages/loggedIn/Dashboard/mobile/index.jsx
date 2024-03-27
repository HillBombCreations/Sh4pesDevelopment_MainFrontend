import PropTypes from 'prop-types';
import { Box } from '@mui/material';

function MobileDashboardPage({ user }) {
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<h2 style={{ fontSize: '24px', color: '#3780FF', textAlign: 'left', marginLeft: '25px' }}>
				Welcome {user?.name}
			</h2>
			<Box component="form" sx={{ display: 'flex', flexDirection: 'row' }}  autoComplete="off">
			</Box>
		</div>
	);
}
MobileDashboardPage.propTypes = {
	user: PropTypes.any,
};

export default MobileDashboardPage;
