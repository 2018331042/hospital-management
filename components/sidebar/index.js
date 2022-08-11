import { Logout, PersonPinCircleOutlined } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/contexts/auth';
import { useSidebar } from '../../utils/contexts/sidebarContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-around',
}));

const Items = {
  patient: {
    buttons: [
      {
        title: 'profile',
        id: 'patient-profile',
        url: '/patient/profile',
        icon: <AccountCircleIcon />,
      },
      {
        title: 'Logout',
        id: 'logout',
        url: '/logout',
        icon: <ExitToAppIcon />,
      },
    ],
  },
  doctor: {
    buttons: [
      {
        title: 'Dashboard',
        id: 'doctor-dashboard',
        url: '/doctor/dashboard',
        icon: <DashboardIcon />,
      },
      {
        title: 'profile',
        id: 'doctor-profile',
        url: '/doctor/profile',
        icon: <AccountCircleIcon color='primary'/>,
      },
      {
        title: 'Logout',
        id: 'logout',
        url: '/logout',
        icon: <ExitToAppIcon color='secondary' sx={{fontSize: 30}}/>,
      },
    ],
  },
  admin: {
    buttons: [
      {
        title: 'Dashboard',
        id: 'admin-dashboard',
        url: '/admin/dashboard',
        icon: <DashboardIcon />,
      },
      {
        title: 'Assign Doctor',
        id: 'assign-doctor',
        url: '/admin/assign-doctor',
        icon: <AddCircleOutlineIcon />
      },
      {
        title: 'Create Department',
        id: 'create-department',
        url: '/admin/createdepartment',
        icon: <AddCircleOutlineIcon />,
      },
      {
        title: 'Logout',
        id: 'logout',
        url: '/logout',
        icon: <ExitToAppIcon />,
      },
    ],
  },

  unauthenticated: {
    buttons: [
      {
        title: 'Patient Login',
        id: 'login-patient',
        url: '/patient/sign-in',
        icon: <LoginIcon color='primary' />,
      },
      {
        title: 'Doctor Login',
        id: 'login-doctor',
        url: '/doctor/sign-in',
        icon: <LoginIcon color='primary'/>,
      },
      {
        title: 'Admin Login',
        id: 'login-admin',
        url: '/admin/auth/sign-in',
        icon: <LoginIcon color='primary'/>,
      },
    ],
  },
};

export const Sidebar = ({ children }) => {
  const { open, setOpen, mode, setMode } = useSidebar();
  const router = useRouter();
  console.log({ mode });
  const items = Items[mode].buttons;
  const handleDrawer = (open) => (event) => {
    console.log({ open });
    setOpen(open);
  };
  const { token, signOut, user } = useAuth();
  console.log({ token });

  const logoutHandler = () => {
    signOut();
    setOpen(false);
    window.location.assign('http://localhost:3000');
  };

  // const list = () => {
  //   console.log('list');
  //   <Box sx={{ width: 350 }} role="presentation" onClick={handleDrawer(false)}>
  //     <List>
  //       {items.map((item) => (
  //         <ListItem key={item.id} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>{item.icon}</ListItemIcon>
  //             <ListItemText color="red" primary={item.title} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //   </Box>;
  // };

  const makeColor = (url) => {
    if (router.pathname === url) {
      return { backgroundColor: '#D2CECD' };
    }
    return {};
  };
  return (
    <>
      <Drawer anchor={'left'} open={open} onClose={handleDrawer(false)}>
        <DrawerHeader sx={{color:"green"}}>
          <Typography>{user.type.toUpperCase()} PANEL</Typography>

          <IconButton onClick={handleDrawer(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {items.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                style={{ ...makeColor(item.url) }}
                onClick={() => {
                  console.log({ item: item.id });
                  item.id === 'logout'
                    ? logoutHandler()
                    : (() => {
                        setOpen(false);
                        router.push(item.url);
                      })();
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {children}
    </>
  );
};
