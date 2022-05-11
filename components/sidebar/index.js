import { PersonPinCircleOutlined } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
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
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useSidebar } from "../../utils/contexts/sidebarContext";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Items = {
  patient: {
    buttons: [
      {
        title: "profile",
        id: "patient-profile",
        url: "/patient/profile",
        icon: <PersonPinCircleOutlined />,
      },
    ],
  },
  doctor: {
    buttons: [
      {
        title: "profile",
        id: "doctor-profile",
        url: "/doctor/profile",
        icon: <PersonPinCircleOutlined />,
      },
    ],
  },
  admin: {
    buttons: [
      {
        title: "profile",
        id: "admin-profile",
        url: "/admin/profile",
        icon: <PersonPinCircleOutlined />,
      },
      {
        title: "assign doctor",
        id: "assign-doctor",
        url: "/admin/assign-doctor",
      },
      {
        title: "Create Department",
        id: "create-department",
        url: "/admin/create-department",
        icon: <PersonPinCircleOutlined />,
      },
    ],
  },

  unauthenticated: {
    buttons: [
      {
        title: "Login As Patient",
        id: "login-patient",
        url: "/patient/sign-in",
        icon: <PersonPinCircleOutlined />,
      },
      {
        title: "Login As Doctor",
        id: "login-doctor",
        url: "/doctor/login",
        icon: <PersonPinCircleOutlined />,
      },
      {
        title: "Login As Admin",
        id: "login-admin",
        url: "/admin/login",
        icon: <PersonPinCircleOutlined />,
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

  const list = () => {
    console.log("list");
    <Box sx={{ width: 350 }} role="presentation" onClick={handleDrawer(false)}>
      <List>
        {items.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText color="red" primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>;
  };

  const makeColor = (url) => {
    if (router.pathname === url) {
      return { backgroundColor: "red" };
    }
    return {};
  };
  return (
    <>
      <Drawer anchor={"left"} open={open} onClose={handleDrawer(false)}>
        <DrawerHeader>
          <Typography>Hospital Management System</Typography>

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
                  setOpen(false);
                  router.push(item.url);
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
