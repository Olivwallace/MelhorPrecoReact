import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ListItemAvatar, Avatar } from '@mui/material';
import { NavBarProps } from './PropsNavBar';
import logo from './img/logo.png';
import { BiListCheck, BiScan, BiLeftArrowAlt } from "react-icons/bi";
import { AiOutlineTeam } from "react-icons/ai";

const drawerWidth = 170;
export const NavBar: React.FC<NavBarProps> = (props) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >

        <List>
          <ListItemButton alignItems="center" href="/">
            <ListItemAvatar>
              <Avatar sx={{ height: '70px', width: '70px' }}
                alt="Logo do site"
                src={logo}
              />
            </ListItemAvatar>
          </ListItemButton>
          <ListItemButton href={props.hrefPerfil}>
            <ListItemAvatar>
              <Avatar
                alt="Foto de perfil"
                src={props.imgPerfil}
              />
            </ListItemAvatar>
            <ListItemText id={props.idPerfil} primary={props.namePerfil} />
          </ListItemButton>
        </List>
        <Divider />
        <List>
          <ListItemButton href={props.hrefListas}>
            <ListItemIcon>
              <BiListCheck size={30} />
            </ListItemIcon>
            <ListItemText primary="Listas" />
          </ListItemButton>
          <Divider />
          <ListItemButton href={props.hrefNota}>
             <ListItemIcon>
             <BiScan size={30} />
              </ListItemIcon>
           
            <ListItemText primary="Cadastrar Nota" />
          </ListItemButton>
          <Divider />
          <ListItemButton href={props.hrefSobreNos}>
          <ListItemIcon>
          <AiOutlineTeam size={30} />
          </ListItemIcon>
           
            <ListItemText primary="Sobre nós" />
          </ListItemButton>
          <Divider />
          <ListItemButton href="/logout">
          <ListItemIcon>
          <BiLeftArrowAlt size={30} />
          </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItemButton>

        </List>


      </Drawer>
    </Box>
  );
}