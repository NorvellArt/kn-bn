import React, { useState } from "react";

import { Outlet } from "react-router-dom";

import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DrawerComponent from "./components/Drawer";
import Container from "@mui/material/Container";

import { LayoutProvider } from "../../provider/LayoutProvider";

import { useAuth } from "../../hooks/useAuth";
import { useLogout } from "../../hooks/useLogout";
import { useLayout } from "../../hooks/useLayout";

const LayoutComponent = () => {
    const { auth } = useAuth();
    const logout = useLogout();
    const { open, toggleDrawer, drawerItems, currentPage } = useLayout();

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogoutClick = async () => {
        await logout();
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer}
                        sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {currentPage()}
                    </Typography>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                        <Box
                            component="section"
                            sx={{
                                m: 1,
                                pl: 2,
                                pr: 2,
                            }}>
                            {auth.user.email}
                        </Box>
                        <Divider />
                        <MenuItem onClick={onLogoutClick}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <DrawerComponent open={open} toggleDrawer={toggleDrawer} drawerItems={drawerItems} />

            <Container maxWidth="lg">
                <Outlet />
            </Container>
        </>
    );
};

const Layout = () => {
    return (
        <LayoutProvider>
            <LayoutComponent />
        </LayoutProvider>
    );
};

export default Layout;
