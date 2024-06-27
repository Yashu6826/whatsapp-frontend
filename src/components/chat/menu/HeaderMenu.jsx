import React, { useState, useContext } from 'react';
import { MoreVert } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';

// Import googleLogout directly
import { googleLogout } from '@react-oauth/google';

import { AccountContext } from '../../../context/AccountProvider';
import { UserContext } from '../../../context/UserProvider';
import { clientId } from '../../../constants/data';

//components
import InfoDrawer from '../../drawer/Drawer';

const MenuOption = (props) => (
    <MenuItem {...props} style={{ fontSize: '14px', padding: '15px 60px 5px 24px', color: '#4A4A4A' }} />
);

const HeaderMenu = () => {
    const [open, setOpen] = useState(null);
    const [openDrawer, setOpenDrawer] = useState(false);

    const { setAccount, setShowloginButton, showlogoutButton, setShowlogoutButton } = useContext(AccountContext);
    const { setPerson } = useContext(UserContext);

    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const onSignoutSuccess = () => {
        alert("You have been logged out successfully");
        console.clear();
        setShowlogoutButton(false);
        setShowloginButton(true);
        setAccount('');
        setPerson({});
    };

    const handleLogout = () => {
        // Perform logout action here
        // Example: calling googleLogout directly
        googleLogout({
            clientId: clientId,
            onLogoutSuccess: onSignoutSuccess,
        });
    };

    const toggleDrawer = () => {
        setOpenDrawer(true);
    };

    return (
        <>
            <MoreVert onClick={handleClick} />
            <Menu
                anchorEl={open}
                keepMounted
                open={Boolean(open)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuOption onClick={() => { handleClose(); toggleDrawer(); }}>Profile</MenuOption>
                {showlogoutButton && (
                    <MenuOption onClick={() => { handleClose(); handleLogout(); }}>
                        Logout
                    </MenuOption>
                )}
            </Menu>
            <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} profile={true} />
        </>
    );
};

export default HeaderMenu;
