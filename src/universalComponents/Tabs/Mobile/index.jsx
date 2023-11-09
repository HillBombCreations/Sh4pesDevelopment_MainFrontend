import { Box, Tabs, Tab } from "@mui/material";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

function SiteTabs({ pathname }) {
    return (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'transparent' }}>
                <Tabs
                    aria-label="Tab navigation"
                    value={pathname}
                    variant='fullWidth'
                    indicatorColor={pathname === '/' ? 'transparent' : 'primary'}
                >
                    <Tab
                        disabled
                        component={Link}
                        to="/"
                        value="/"
                    />
                </Tabs>
            </Box>
        </div>
    );
}

SiteTabs.propTypes = {
    pathname: PropTypes.string.isRequired
}

export default SiteTabs;