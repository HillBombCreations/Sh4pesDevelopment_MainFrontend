import { Box, Tabs, Tab } from "@mui/material";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
function SiteTabs({ pathname }) {
    return (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'transparent', margin: '0 10px 0 10px' }}>
                <Tabs
                    aria-label="Tab navigation"
                    value={pathname}
                    variant='fullWidth'
                >
                    <Tab
                        label="Home"
                        component={Link}
                        to="/"
                        value="/"
                    />
                    <Tab
                        label="Contact"
                        component={Link}
                        to="/contact"
                        value="/contact"
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