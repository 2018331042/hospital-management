import { Drawer } from "@mui/material";
import React from "react";

const drawerWidth = 240;


const DrawerOption = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >

      </Drawer>
    </div>
  );
};

export default DrawerOption;
