//----------------------- Import Dependencias
import React, { ChangeEvent, FocusEventHandler, useCallback, useEffect, useState } from "react";

//----------------------- Props Input
import { InputProps} from "../../Inputs/PropsInput";
import {produtoBD } from "../PropsList";
import { Autocomplete, TextField } from "@mui/material";

export const InputNomeLista:React.FC<InputProps> = (props) =>{
    return(
        <div className={props.className}>
            <input type="text"
                    id={props.id} 
                    placeholder={props.placeholder} 
                    onChange={props.onChange} 
                    autoComplete="off" 
                   
                    />
        </div>
    );
};