import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import { user , LoginData, RegisterData } from "../../model/";
import { AuthContext } from "../auth/authContext"
import { useAPI } from "../../service/api/useApi";


export const AuthProvider = ({children}:{children: JSX.Element}) => {
    
    const api = useAPI.Login;
    const apiSingUp = useAPI.Register;

    const navigate = useNavigate();

    const [user, setUser] = useState <user | null> (null);

    useEffect(() =>{

        const validToken = async()=> {
            const storage = localStorage.getItem('authToken');
            if(storage){
                const data = await api.validateToken(storage);
                if(data.user){
                    setUser(data.user);
                }
            }
        }

        validToken();
    },[api])


    const login = async ({email, pass} : LoginData) => {
        let autenticado:boolean = false;

        const data = await api.login({email, pass}); 
        if(data.user && data.token) {
            setUser(data.user);
            autenticado = true;
        }

        return autenticado;
    }

    const loginKeep = async ({email, pass} : LoginData) => {
        let autenticado:boolean = false;

        const data = await api.login({email, pass}); 
        if(data.user && data.token) {
            setUser(data.user);
            setToken(data.token);
            autenticado = true;
        }

        return autenticado;
    }
    
    const logout =  async () => {
        await api.logout();
        setUser(null);
        setToken('');
        navigate("/login");
    }

    const setToken = (token: string) => {
        localStorage.setItem('authToken', token);
    }

    const singup = async ({user, loginData}: RegisterData) => {
        let registrado:boolean = false;
        const responseEmail = await apiSingUp.existEmail(loginData.email)
        const responsePass = await apiSingUp.existUser(user.CPF);
        
        if(responseEmail.exists && responsePass.exists){
            const data = await apiSingUp.register({user, loginData})
            if(data.user && data.register){
                setUser(data.user);
                registrado = true;   
            }
        }else{
            setUser({name:user.Nome , email: loginData.email});
            if(responseEmail.exists) alert('Email Já Cadastrado')
            else alert('CPF Já Cadastrado')
        }

        return registrado;
    }

    return(
        <AuthContext.Provider value={{user, login, loginKeep, logout, singup}}>
            {children}
        </AuthContext.Provider>
    )
}
