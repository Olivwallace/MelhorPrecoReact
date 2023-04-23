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
        <button className={props.class} disabled={props.disebled} type="submit" onClick={props.onClick}> 
        Login
      
        </button>
    );
};

export const LinkLogin : React.FC <ButtonProps> = (props) => {
    return (
        <Link className="link" to={(props.href != null)?props.href:'#'}>
            Login
           
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
