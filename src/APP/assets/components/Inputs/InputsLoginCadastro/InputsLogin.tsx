//----------------------- Import Dependencias
import React, { ChangeEvent, useCallback, useState } from "react";

import  { HiOutlineMail, HiOutlineKey } from "react-icons/hi"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

//----------------------- Props Input
import { InputProps } from "../PropsInput"
import { useEventCallback } from "@mui/material";

//---------------------------- Redefined Types
type InputEvent = ChangeEvent<HTMLInputElement>

//----------------------- Input Email
export const InputEmail:React.FC<InputProps> = (props) => {
    return (
        <div className="divInputE">
            <div className="divIcon"><HiOutlineMail color="white" size={20}/></div>
            <input 
            className={props.className}
            autoComplete="off" 
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
        <div className="divInputS">
           <div className="divIcon"> <HiOutlineKey color="white" size={20}/></div>
            <input  className={props.className} 
            autoComplete="off" 
                type={(verSenha)?"text":"password"}
                name="password"
                id={props.id}  
                value={props.value} 
                onChange={props.onChange} 
                placeholder={props.placeholder}/>
            {(verSenha)?
                <div className="divOlho"><AiOutlineEyeInvisible color="white" onClick={handleSeeKey}/></div>:
                <div className="divOlho"><AiOutlineEye color="white" onClick={handleSeeKey}/></div>}
                
        </div>
    );
};