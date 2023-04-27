//----------------------- Import Dependencias
import React, { ChangeEvent, FocusEventHandler, useCallback, useEffect, useState } from "react";

import  { HiOutlineMail, HiOutlineKey, HiOutlineIdentification, HiOutlineCake, HiOutlineUserCircle } from "react-icons/hi";

//----------------------- Props Input
import { InputProps, InputPropsArray } from "../PropsInpult";

export const inputNome : React.FC<InputProps> = (props) =>{
    return(
        <div className={props.className}>
            <input type="text"
                    id={props.id} 
                    placeholder={props.placeholder} 
                    onChange={props.onChange} 
                    autoComplete="off" 
                    value={props.value}/>
        </div>
    );
}
export const inputProduto : React.FC<InputProps> = (props) =>{
    return(
        <input type="text"
        id={props.id} 
        placeholder={props.placeholder} 
        onChange={props.onChange} 
        autoComplete="off" 
        value={props.value}/>

    );
}