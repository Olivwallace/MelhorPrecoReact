import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import { user , LoginData, RegisterData } from "../../model/";
import { AuthContext } from "../auth/authContext"
import { useAPI } from "../../service/api/useApi";
import { stringify } from "querystring";
import { responsiveFontSizes } from "@mui/material";


export const AuthProvider = ({children}:{children: JSX.Element}) => {
    
    const api = useAPI.Login;
    const apiSingUp = useAPI.Register;

    const navigate = useNavigate();

    const [user, setUser] = useState <user | null> (null);

 
    const validToken = async()=> {
        const storage = localStorage.getItem('authToken');
        if(storage){
            const data = await api.validateToken(storage);
            if(data.data){
                setUser(data.data);
            }
        }
    }

    const session = () => {
        let resp = false;

        let strData = localStorage.getItem('session') 
        if(strData) resp = new Date().toDateString() === strData

        return resp; 
    }

    const setSession = (data: string) => {
        localStorage.setItem('session', data);
    }

    const login = async ({email, password,token} : LoginData) => {
        let autenticado:boolean = false;

        const data = await api.login({email, password,token}); 
        if(data.user && data.token) {
            setUser(data.user);
            setSession(new Date().toDateString())
            setToken("")
            autenticado = true;
        }

        return autenticado;
    }

    const loginKeep = async ({email, password,token} : LoginData) => {
        let autenticado:boolean = false;

        const data = await api.login({email, password,token}); 
        if(data.user && data.token) {
            setUser(data.user);
            setSession(new Date().toDateString())
            setToken(data.token);
            autenticado = true;
        }

        return autenticado;
    }
    
    const logout =  async () => {
        await api.logout();
        setUser(null);
        setToken('');
        setSession('')
        navigate("/login");
    }

    const setToken = (token: string) => {
        localStorage.setItem('authToken', token);
    }

    const singup = async ({user, loginData}: RegisterData) => {

        let registrado:boolean = false;
        const responseCpf = await apiSingUp.existUser(user.CPF);
        const responseEmail = await apiSingUp.existEmail(loginData.email)

        if(!responseEmail.data.exist && !responseCpf.data.exist){
            const response = await apiSingUp.register({user, loginData})
            if( response.data.register && response.data.user){
                setUser(response.data.user);
                registrado = true;   
            }
        }else{
            setUser({name:user.nome , email: loginData.email});
            if(responseEmail.data.exist) alert('Email Já Cadastrado')
            else alert('CPF Já Cadastrado')
        }

        return registrado;
    }

    return(
        <AuthContext.Provider value={{user, login, loginKeep, singup, session, usuario, validToken, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
