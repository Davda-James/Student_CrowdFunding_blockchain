import React, { useState, useRef, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box } from '@mui/material';
import { Home, Create, AttachMoney, Menu } from '@mui/icons-material'; // Updated Contribution to AttachMoney

const drawerWidth = 240;

const VerticalNav = () => {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null); // Create a ref for the Drawer

  const handleDrawerToggle = () => {
    setOpen((prevOpen) => !prevOpen); // Toggle the drawer state
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (drawerRef.current && !drawerRef.current.contains(event.target) && !event.target.closest('button')) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <IconButton
        color="inherit"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1201, // Ensure it’s above other elements
        }}
      >
        <Menu />
      </IconButton>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        ref={drawerRef} // Attach the ref to the Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box
          sx={{
            paddingTop: '64px', // Adjust according to your header height
          }}
        >
          <List>
            <ListItem button component="a" href="/">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component="a" href="/create">
              <ListItemIcon>
                <Create />
              </ListItemIcon>
              <ListItemText primary="Create" />
            </ListItem>
            <ListItem button component="a" href="/contribute">
              <ListItemIcon>
                <AttachMoney />
              </ListItemIcon>
              <ListItemText primary="Contribute" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default VerticalNav;
