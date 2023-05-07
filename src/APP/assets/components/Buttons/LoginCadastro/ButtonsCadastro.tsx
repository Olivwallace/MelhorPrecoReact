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
        <button className={props.class} disabled={props.disebled} type="submit" onClick={props.onClick}> 
        Concluir 
       
        </button>
    );
};

//----------------------- Button Link Cadastro
export const LinkCadastro : React.FC <ButtonProps> = (props) => {
    return (
        <Link className={props.class} to={(props.href != null)?props.href:'#'}>
            Cadastre-se
        </Link>
    )
}

//----------------------- Button Link Continue Cadastro
export const LinkContinue : React.FC <ButtonProps> = (props) => {
    return (
        <Link className={props.class} onClick={props.onClick} to={(props.href != null)?props.href:'#'}>
            {(props.left)?props.content:null}
            {(props.icon != null)?props.icon:<VscArrowRight/>}
            {(props.right)?props.content:null}
        </Link>
    )
}