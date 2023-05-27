import * as React from 'react';
import { NavBarProps } from './PropsNavBar';
import logo from "./img/logo.png";
import { Avatar, Menu, MenuItem } from '@mui/material';
import {Link } from "react-router-dom";
import './navBar.css';


export const NavBar: React.FC<NavBarProps> = (props) => {
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);


  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return(
  
    <header className='navegacao'>
      <Link to= {"/"}><Avatar sx={{ height: '50px', width: '50px' }}
                alt="Logo do site"
                src={logo}
              /></Link>

    
      {props.auth?(   <>
       <div>
      <Link className='linkHeader' to={props.hrefListas}>Lista</Link>
       <Link className='linkHeader' to={props.hrefNota}>Nota</Link>
       <Link className='linkHeader' to={props.hrefSobreNos}>Sobre nós</Link>
       </div>
      <div className='div'>
              <label className='logado' onClick={handleMenu}>{props.namePerfil}</label>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem ><Link className='menuLink' to={props.hrefPerfil}>Perfil</Link></MenuItem>
                <MenuItem ><Link className='menuLink' to={'/logout'}>Sair</Link></MenuItem>
              </Menu>
            </div>
            </>
            ):(<>
           
            <div className='div'>
            <Link className='linkHeader' to={props.hrefListas}>Login </Link>
            <Link className='linkHeader' to={props.hrefNota}>Cadastre-se</Link>
            <Link className='linkHeader' to={props.hrefSobreNos}>Sobre nós</Link>
            </div>
            </>
            )}
    </header>
  );
}