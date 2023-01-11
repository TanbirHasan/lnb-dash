import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import logo from "../../public/assets/logo.png";
import overview from "../../public/assets/Start.png";
import user from "../../public/assets/User.png";
import notification from "../../public/assets/notification.png";
import payment from "../../public/assets/dashpayment.jpeg";
import setting from "../../public/assets/Setting.png";
import helps from "../../public/assets/Helps.png";
import exit from "../../public/assets/Exit.png";
import Link from "next/link";
import profile from "../../public/assets/profile.png";
import {
  Avatar,
  Badge,
  Container,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import Cookies from "js-cookie";

import AppBar from "@mui/material/AppBar";
import { useRouter } from "next/router";

const drawerWidth = 240;

const Dashboard = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const route = useRouter();

  const logout = () => {
    Cookies.remove("token");
    route.push("/auth/login");
  };

  useEffect(() => {
    if (route.pathname === "/dashboard") {
      route.push("/dashboardpage/overview");
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // defining drawer
  const drawer = (
    <div>
      <div className="py-10 px-5">
        <Image src={logo} className="max-w-full h-auto" />
      </div>

      <List>
        <ListItem
          className={`${
            route.pathname === "/dashboardpage/overview"
              ? "border-4 border-l-indigo-600"
              : ""
          }`}
        >
        <Link href="/dashboardpage/overview">
          <ListItemButton>
   
            <ListItemIcon className="flex items-center">
              <Image
                src={overview}
                className="max-w-full h-auto text-gray-500 "
              />
            </ListItemIcon>
            
              <h3 className="font-semibold text-xl font-sans ">Overview</h3>
     
          </ListItemButton>
          </Link>
        </ListItem>
        <ListItem
          className={`${
            route.pathname === "/dashboardpage/users"
              ? "border-4 border-l-indigo-600"
              : ""
          }`}
        >
            <Link href="/dashboardpage/users">
          <ListItemButton>
            <ListItemIcon className="flex items-center">
              <Image src={user} className="max-w-full h-auto text-black-" />
            </ListItemIcon>
          
              <h3 className="font-semibold text-xl font-sans ">User List</h3>
           
          </ListItemButton>
          </Link>
        </ListItem>

        <ListItem
          className={`${
            route.pathname === "/dashboardpage/paymenthistory/[slug]"
              ? "border-4 border-l-indigo-600"
              : ""
          }`}
        >
          <ListItemButton>
            <ListItemIcon className="flex items-center">
              <Image
                src={payment}
                className="paymentlogo max-w-full h-auto text-black"
              />
            </ListItemIcon>
            <h3 className="font-semibold text-xl font-sans ">Payment</h3>
          </ListItemButton>
        </ListItem>

        <ListItem
          className={`${
            route.pathname === "/dashboardpage/setting"
              ? "border-4 border-l-indigo-600"
              : ""
          }`}
        >
          <ListItemButton>
            <ListItemIcon className="flex items-center">
              <Image
                src={setting}
                className="max-w-full h-auto text-gray-500 "
              />
            </ListItemIcon>
            <h3 className="font-semibold text-xl font-sans ">Setting</h3>
          </ListItemButton>
        </ListItem>

        <ListItem
          className={`${
            route.pathname === "/dashboardpage/help"
              ? "border-4 border-l-indigo-600"
              : ""
          }`}
        >
          <ListItemButton>
            <ListItemIcon className="flex items-center">
              <Image src={helps} className="max-w-full h-auto " />
            </ListItemIcon>
            <h3 className="font-semibold text-xl font-sans ">Helps</h3>
          </ListItemButton>
        </ListItem>

        <ListItem
          className={`${
            route.pathname === "/dashboardpage/exit"
              ? "border-4 border-l-indigo-600"
              : ""
          }`}
        >
          <ListItemButton>
            <ListItemIcon className="flex items-center">
              <Image src={exit} className="max-w-full h-auto text-gray-500 " />
            </ListItemIcon>
            <h3 className="font-semibold text-xl font-sans ">Exit</h3>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: "white",
            boxShadow: 1,
          }}
        >
          <Toolbar>
            <IconButton
              color="black"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box display="flex" flexGrow="1"></Box>
            <Box>
              <Tooltip title="Open settings">
                <button
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                  className="flex items-center"
                >
                  <Image src={notification} />
                  <Avatar className="mx-2">
                    <AccountCircleIcon/>

                  </Avatar>
                   
                </button>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={logout}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,

            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Container className="pt-10 ">{children}</Container>
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
