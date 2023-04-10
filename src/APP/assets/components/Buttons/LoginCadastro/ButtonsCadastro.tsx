//----------------------- Importa Dependencias
import React from "react";

//----------------------- Icones
import { AiOutlineUserAdd } from "react-icons/ai";
import { VscArrowRight } from "react-icons/vsc"

//----------------------- Props Button
import { ButtonProps } from "../PropsButton";
import { Link } from "react-router-dom";


//----------------------- Button Login
export const BtnCadastro: React.FC <ButtonProps> = (props) => {
    return (
        <button disabled={props.disebled} type="submit" onClick={props.onClick}> 
        Concluir 
        {(props.icon != null)?props.icon:<AiOutlineUserAdd size={props.sizeIcon}/>}
        </button>
    );
};

//----------------------- Button Link Cadastro
export const LinkCadastro : React.FC <ButtonProps> = (props) => {
    return (
        <Link to={(props.href != null)?props.href:'#'}>
            {(props.icon != null)?props.icon:<AiOutlineUserAdd size={props.sizeIcon}/>}
            Cadastre-se
        </Link>
    )
}

//----------------------- Button Link Continue Cadastro
export const LinkContinue : React.FC <ButtonProps> = (props) => {
    return (
        <Link onClick={props.onClick} to={(props.href != null)?props.href:'#'}>
            {(props.left)?props.content:null}
            {(props.icon != null)?props.icon:<VscArrowRight/>}
            {(props.right)?props.content:null}
        </Link>
    )
}