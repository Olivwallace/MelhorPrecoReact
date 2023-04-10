//----------------------- Import Dependencias
import React, { ChangeEvent, FocusEventHandler, useCallback, useEffect, useState } from "react";

import  { HiOutlineMail, HiOutlineKey, HiOutlineIdentification, HiOutlineCake, HiOutlineUserCircle } from "react-icons/hi"

//----------------------- Props Input
import { InputProps, InputPropsArray } from "../PropsInpult"
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineWoman, AiOutlineMan } from "react-icons/ai";
import { TbGenderNeutrois } from "react-icons/tb"
import { validFullPassword } from "../../../scripts/usefulValidation";
import { PassComp } from "../../../../model";

//----------------------- Input Email
export const InputEmailValid:React.FC<InputPropsArray> = (props) => {
    return (
        <div className={props.className}>
            <HiOutlineMail size={25}/>
            <input autoComplete="off" 
                type="text"
                name="email"
                id={props.id?.[0]} 
                value={props.value?.[0]}
                onChange={props.onChange?.[0]} 
                placeholder={props.placeholder?.[0]} />
            <input autoComplete="off" 
                type="text"
                name="confirm_email"
                id={props.id?.[1]} 
                value={props.value?.[1]}
                onChange={props.onChange?.[1]} 
                placeholder={props.placeholder?.[1]} />
        </div>
    );
};

//----------------------- Input Senha
export const InputPassConfirm:React.FC<InputPropsArray> = (props) => {

    const [verSenha, setVerSenha] = useState(false);
    const handleSeeKey = useCallback (() =>{
        setVerSenha(!verSenha);
    },[verSenha])


    const [errMessage, setMessage] = useState('');


    const compararSenhas = ({password, password_comp}:PassComp) => {
        let result = validFullPassword({password, password_comp})
        console.log(result + " " + props.value[0] + " " + props.value[1])
        
        if(result) setMessage('')
        else setMessage('Senhas Não Conferem')
    }

    return (
        <div className={props.className}>
            <HiOutlineKey size={25}/>
            <input autoComplete="off" 
                type={(verSenha)?"text":"password"}
                name="password"
                id={props.id?.[0]} 
                value={props.value[0]}
                onChange={props.onChange?.[0]}
                onFocusCapture={e => { setMessage('') }}
                onBlurCapture={e => {compararSenhas({password: e.target.value, password_comp: props.value[1]})}}
                placeholder={props.placeholder?.[0]}/>

            <input autoComplete="off" 
                type={(verSenha)?"text":"password"}
                name="confirm_password"
                id={props.id?.[1]} 
                value={props.value[1]}
                onChange={e => { props.onChange?.[1](e); compararSenhas({password: props.value[0], password_comp: e.target.value})}} 
                placeholder={props.placeholder?.[1]}/>

            {(verSenha)?
                <AiOutlineEyeInvisible onClick={handleSeeKey}/>:
                <AiOutlineEye onClick={handleSeeKey}/>}
            
            <div className="error">{errMessage}</div> 

            <div>
                <p>Números</p>
                <p>6 a 15 caracteres</p>
                <p>Letras Maiusculas e Minusculas</p>
            </div>
        </div>
    );
};

//----------------------- Input CPF
export const InputCPF:React.FC<InputProps> = (props) => {

    const formatCPF = (cpf: string) => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      }

    const [CPF, setCPF] = useState(formatCPF(props.value));
    const handleCPF = (event : React.ChangeEvent<HTMLInputElement> ) => {
        let cpfValue = event.target.value
        cpfValue = cpfValue.replace(/\D/g, "") // Remove todos os caracteres não-numéricos
        cpfValue = cpfValue.substring(0, 11) // Limita o CPF a 11 caracteres

        // Formata o CPF com pontos e traço
        cpfValue = cpfValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")

        setCPF(cpfValue)
        if(props.onChange) {
            props.onChange(event);
        }
    }

    return ( 
        <div className={props.className}>
            <HiOutlineIdentification size={20}/>
            <input autoComplete="off" 
                type="text"
                name="CPF"
                id={props.id} 
                value={CPF}
                pattern="^\d{3}\.\d{3}\.\d{3}-\d{2}$"
                onChange={handleCPF} 
                placeholder={props.placeholder} />
        </div>
    );
};

//----------------------- Input Nome
export const InputNome:React.FC<InputPropsArray> = (props) => {

    const capitalize = (str:string) => {
        if(str != undefined) return str.charAt(0).toUpperCase() + str.slice(1);
        else return str;
    }

    return ( 
        <div className={props.className}>
            <HiOutlineUserCircle size={25}/>
            <input autoComplete="off" 
                type="text"
                name="nome"
                id={props.id?.[0]} 
                value={capitalize(props.value?.[0])}
                onChange={props.onChange?.[0]} 
                placeholder={props.placeholder?.[0]} />
            <input autoComplete="off" 
                type="text"
                name="sobrenome"
                id={props.id?.[1]} 
                value={capitalize(props.value?.[1])}
                onChange={props.onChange?.[1]} 
                placeholder={props.placeholder?.[1]} />
        </div>
    );
};

//----------------------- Input Data
export const InputData:React.FC<InputProps> = (props) => {
    return (
        <div className={props.className}>
            <HiOutlineCake size={25}/>
            <input autoComplete="off" 
                type="date"
                name="data"
                id={props.id} 
                value={props.value}
                onChange={props.onChange} 
                placeholder={props.placeholder} />
        </div>
    )
}

//---------------------- Input Gender
interface InputPropsGender {
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}
  
export const InputGender: React.FC<InputPropsGender> = (props) => {
    const [selectedGender, setSelectedGender] = useState<string | undefined>(props.value);
  
    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedGender(event.target.value);
      if (props.onChange) {
        props.onChange(event);
      }
    }
  
    return (
      <div className={props.className}>
        <AiOutlineMan size={25} />
        <input
          type="radio"
          name="opcao"
          value="M"
          id="M"
          checked={selectedGender === "M"}
          onChange={handleGenderChange}
        />
        <label htmlFor="M">Masculino</label>
  
        <AiOutlineWoman size={25} />
        <input
          type="radio"
          name="opcao"
          value="W"
          id="W"
          checked={selectedGender === "W"}
          onChange={handleGenderChange}
        />
        <label htmlFor="W">Feminino</label>
  
        <TbGenderNeutrois size={25} />
        <input
          type="radio"
          name="opcao"
          value="N"
          id="N"
          checked={selectedGender === "N"}
          onChange={handleGenderChange}
        />
        <label htmlFor="N">Outros</label>
      </div>
    );
  }