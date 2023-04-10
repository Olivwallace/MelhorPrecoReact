//----------------------- Import Dependencias
import React, { ChangeEvent, useCallback, useState } from "react";

import  { HiOutlineMail, HiOutlineKey } from "react-icons/hi"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

//----------------------- Props Input
import { InputProps } from "../PropsInpult"
import { useEventCallback } from "@mui/material";

//---------------------------- Redefined Types
type InputEvent = ChangeEvent<HTMLInputElement>

//----------------------- Input Email
export const InputEmail:React.FC<InputProps> = (props) => {
    return (
        <div className={props.className}>
            <HiOutlineMail size={20}/>
            <input autoComplete="off" 
                type="text"
                name="email"
                id={props.id} 
                value={props.value}
                onChange={props.onChange} 
                placeholder={props.placeholder} />
        </div>
    );
};

//----------------------- Input Senha
export const InputPass:React.FC<InputProps> = (props) => {

    const [verSenha, setVerSenha] = useState(false);
    const handleSeeKey = useCallback (() =>{
        setVerSenha(!verSenha);
    },[verSenha])

    return (
        <div className={props.className}>
            <HiOutlineKey size={20}/>
            <input autoComplete="off" 
                type={(verSenha)?"text":"password"}
                name="password"
                id={props.id}  
                value={props.value} 
                onChange={props.onChange} 
                placeholder={props.placeholder}/>
            
            {(verSenha)?
                <AiOutlineEyeInvisible onClick={handleSeeKey}/>:
                <AiOutlineEye onClick={handleSeeKey}/>}
                
        </div>
    );
};