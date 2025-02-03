import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {useNavigate} from "react-router-dom";
import {Stack} from "@mui/material";
import styles from './header.module.css'

const drawerData = [
  {label: "Cats", link: "/", icon: <InboxIcon />},
  {label: "Breeds", link: "/breeds", icon: <InboxIcon />},
  {label: "Favorites", link: "/favorites", icon: <InboxIcon />},
]

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {drawerData.map((item, index) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton  onClick={() => navigate(item.link)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Stack p={2} className={styles.header} width={'100%'}>
      <Button className={styles.button} onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Stack>
  );
}
export default Header;