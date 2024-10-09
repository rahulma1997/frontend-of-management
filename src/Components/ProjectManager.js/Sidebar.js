import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link, Outlet } from 'react-router-dom';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'; 
import ChatIcon from '@mui/icons-material/Chat'; 
import WorkIcon from '@mui/icons-material/Work';


import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import SendIcon from '@mui/icons-material/Send';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function SidebarEmployee() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open2 = Boolean(anchorEl);
  const handleClick2 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl(null);
  };

  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{bgcolor:"white"}} open={open}>
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{color:"black",fontWeight:"bold"}} noWrap component="div">
            Project Manager Dashboard
          </Typography>
          
        </Toolbar>
      </AppBar>
      <div className='flex'>
      <Drawer variant="permanent" open={open} >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
       
        <div className=" h-screen flex flex-col bg-slate-300 ">
        
        <ul>
      
      <li className="flex font-bold items-center py-2 pl-3 hover:bg-gray-100 cursor-pointer">
      <WorkIcon className="mr-5 ml-2" />
      <Link to="Manageproject">Manage Projects</Link>
      </li>
      <Link to="Taskmanagement">
        <li className="flex items-center py-2 pl-3 hover:bg-gray-100 cursor-pointer font-bold">
          <AssignmentIcon className="mr-5 ml-2" />
          Task Management
        </li>
      </Link>

      
      <Link to="Pstatus">
        <li className="flex font-bold items-center py-2 pl-3 hover:bg-gray-100 cursor-pointer">
          <InsertDriveFileIcon className="mr-5 ml-2" /> 
          Status & Reports
        </li>
      </Link>
      <Link to="chat">
        <li className="flex font-bold items-center py-2 pl-3 hover:bg-gray-100 cursor-pointer">
          <ChatIcon className="mr-5 ml-2" /> 
          Chat 
        </li>
      </Link>
      
      <li className="hover:bg-gray-100  p-2">
    
      
      <Button
        id="fade-button"
        aria-controls={open2 ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open2 ? 'true' : undefined}
        onClick={handleClick2}
        sx={{color:"black", fontWeight:"bold"}}
      >

<SendIcon sx={{marginLeft:1 , marginRight:2}}/> Admin 
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open2}
        onClose={handleClose2}
        TransitionComponent={Fade}
      ><Link  to="overall">
        <MenuItem onClick={handleClose2}> Overall Prograss</MenuItem>
        </Link>
        <Link  to="projectrepots">
        <MenuItem onClick={handleClose2}>Project Report</MenuItem>
        </Link>
      </Menu>
      </li>
    </ul>     
           
            <li className="flex font-bold items-center py-2 pl-3 hover:bg-gray-100 cursor-pointer mt-auto list-none">
            <Link to="/">    <ExitToAppIcon className="mr-5 ml-2" />
        Logout </Link>
      </li>
      
      </div>
      
        
        
      </Drawer>
      <Outlet/>
      </div>
    </Box>
    </>
  );
}















