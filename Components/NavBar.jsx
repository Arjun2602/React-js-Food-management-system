import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const toggleDrawer = () => {
  setOpen((prev) => !prev);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    // console.log(setAnchorEl)
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    e.preventDefault();
    navigate('/');
  };
  const navigateUserProfile = () => {
    navigate('userProfile');
  }
  const navigateModifyItems = () => {
    navigate('modify');
  }
  const handleMenuClose = () => {

  }
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={navigateUserProfile}>
            <ListItemText primary={"User Profile"} />
          </ListItemButton>
          <Divider />
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={navigateModifyItems}>
            <ListItemText primary={"Modify Items"} />
          </ListItemButton>
          <Divider />
        </ListItem>
      </List>
      
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className='flex flex-row items-center justify-center'>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
            
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: 24 ,fontWeight: "bold" }}>
            Foodyy
          </Typography>
          <IconButton
            size="large"
            onClick={handleMenu}
            onClose={()=>{setAnchorEl(null)}}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={()=>{setAnchorEl(null)}}
          >
            {/* <MenuItem onClick={handleClose}>My Profile</MenuItem> */}
            <MenuItem onClick={handleClose}>Log out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer 
              sx={{
              width: 240,
              [`& .MuiDrawer-paper`]: {
                width: 240,
                marginTop: "64px",
              },
            }}
            variant="persistent"
          open={open} onClose={toggleDrawer}>
            {DrawerList}
          </Drawer>
    </Box>
  );
}
