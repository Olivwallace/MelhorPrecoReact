//----------------------- Importa Dependencias
import React from "react";

//----------------------- Icones

import { BiPencil } from "react-icons/bi";

//----------------------- Props Button
import { ButtonProps } from "../PropsButton";



//----------------------- Button Login
export const BtnAlterar: React.FC <ButtonProps> = (props) => {
    return (
        <button className={props.class} disabled={props.disebled} type="button" onClick={props.onClick}> 
        <BiPencil size={25}/>
       
        </button>
    );
};

export const BtnDelete: React.FC <ButtonProps> = (props) =>{
    return(
        <button className={props.class} disabled={props.disebled} type="button" onClick={props.onClick}> 
        delete
       
        </button>

    );
}
