//----------------------- Importa Dependencias
import React from "react";

//----------------------- Icones
import { CgLogIn, CgLogOut } from "react-icons/cg"

//----------------------- Props Button
import { ButtonProps } from "../PropsButton";
import { Link } from "react-router-dom";


//----------------------- Button Login
export const BtnLogin: React.FC <ButtonProps> = (props) => {
    return (
        <button disabled={props.disebled} type="submit" onClick={props.onClick}> 
        Login
        {(props.icon != null)?props.icon:<CgLogIn size={props.sizeIcon}/>}
        </button>
    );
};

export const LinkLogin : React.FC <ButtonProps> = (props) => {
    return (
        <Link to={(props.href != null)?props.href:'#'}>
            Efetuar Login
            {(props.icon != null)?props.icon:<CgLogIn size={props.sizeIcon}/>}
        </Link>
    )
}

export const BtnLogout: React.FC <ButtonProps> = (props) => {
    return (
        <button disabled={props.disebled} type="submit" onClick={props.onClick}> 
        Logout
        {(props.icon != null)?props.icon:<CgLogOut size={props.sizeIcon}/>}
        </button>
    );
};
