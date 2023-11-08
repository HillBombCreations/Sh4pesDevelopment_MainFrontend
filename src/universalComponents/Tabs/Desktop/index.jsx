import { Box, Tabs, Tab } from "@mui/material";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
function SiteTabs({ pathname }) {
    return (
        <div style={{ marginLeft: 'auto' }}>
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
                    <Tab
                        label="Services"
                        component={Link}
                        to="/#services"
                        value="/#services"
                    />
                    <Tab
                        label="Contact"
                        component={Link}
                        to="/#contact"
                        value="/#contact"
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