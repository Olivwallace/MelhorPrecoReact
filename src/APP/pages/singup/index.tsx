//----------------------- Importa Dependencias
import React, { ChangeEvent, useContext, useEffect, useMemo } from "react";
import { useCallback, useState } from "react";

//----------------------- Importa Componentes
import { BtnCadastro, InputData, InputGender, InputNome, InputPassConfirm, LinkContinue, LinkLogin } from "../../assets/components";
import { InputEmailValid, InputCPF} from "../../assets/components"
import { HiOutlineArrowLeft } from "react-icons/hi";
import { validaDadosUsuario, validaDadosLogin } from "../../assets/scripts/usefulValidation";
import { useAPI } from "../../service/api/useApi";
import { AuthContext } from "../../contexts/auth/authContext";
import { useNavigate } from "react-router-dom";

//---------------------------- Redefined Types
type InputEvent = ChangeEvent<HTMLInputElement>
type EventSubmit = React.FormEvent<HTMLFormElement>

//----------------------- Login Page
export const SingUp: React.FC = (props) => {

    const navigate = useNavigate();

    //Armazena Campos do Formulario
    const [formState, setFormState] = useState({
        continuar: false,
        CPF: '',
        Nome: '',
        Sobrenome: '',
        Genero: '',
        Nascimento: '',
        Email: '',
        Pass: '',
        ValidarEmail: '',
        ValidarPass: ''
    })

    //Altera Parte do Formulario Visivel
    const handleContinuar = () => {
        setFormState({...formState, continuar: !formState.continuar})
        console.log(formState.Nascimento)
    }

    //Valida Campos Iniciais
    const validarCamposIniciais = () => {
        let usuario = {
            CPF: formState.CPF, 
            Nome: formState.Nome, 
            Sobrenome: formState.Sobrenome,
            Genero: formState.Genero,
            Nascimento: formState.Nascimento}
        
        return validaDadosUsuario(usuario);
    }

    //Valida Campos Finais
    const validarCamposFinais = () =>{
        let dadosLogin = {
            Email: formState.Email,
            ValidarEmail: formState.ValidarEmail,
            Pass: formState.Pass,
            ValidarPass: formState.Pass
        }

        return validaDadosLogin(dadosLogin);
    }

    const context = useContext(AuthContext);
    const handleRegister = useCallback(async (event: EventSubmit) =>{
        let novoUser = {'user': {'CPF': formState.CPF, 
                                 'Nome': formState.Nome, 
                                 'Sobrenome': formState.Sobrenome, 
                                 'Genero': formState.Genero, 
                                 'Nascimento': formState.Nascimento},
                        'loginData': { email: formState.Email, pass: formState.Pass }}

        let registrado;
        event.preventDefault()

        if(validarCamposIniciais() && validarCamposFinais()){
            registrado = await context.singup(novoUser)
            navigate('/login');
        }

    },[formState.CPF, formState.Email])


    //Construtor Pagina
    return (
        <main>
            
            <div>
                <h1>Olá, bem-vindo de volta!</h1>
                <h3>Vamos economizar ainda mais?</h3>
                <LinkLogin href="/login" sizeIcon={25}/>
            </div>

            <form onSubmit={handleRegister}>
                {(formState.continuar)?
                    <div>
                        <h1></h1>
                        <InputEmailValid
                        onChange={[(event:InputEvent) => { setFormState({...formState, Email: event.target.value}) },
                                   (event:InputEvent) => { setFormState({...formState, ValidarEmail: event.target.value}) } ] }
                        value={[formState.Email, formState.ValidarEmail]}
                        placeholder ={["Email", "Confirmar Email"]}/>

                        <InputPassConfirm
                        onChange={[(event:InputEvent) => { setFormState({...formState, Pass: event.target.value}) },
                                   (event:InputEvent) => { setFormState({...formState, ValidarPass: event.target.value}) } ] } 
                        value={[formState.Pass, formState.ValidarPass]}
                        placeholder={["Senha", "Confirma Senha"]}/>

                        <LinkContinue right={true} 
                        content=" Voltar" 
                        icon={<HiOutlineArrowLeft/>} 
                        onClick={handleContinuar}/>
                        
                        <BtnCadastro disebled={!validarCamposFinais()} onClick={console.log}/>
                    </div>
                    :
                    <div>
                        <h1>Novo Usuario</h1>
                        
                        <InputCPF 
                        onChange={(event:InputEvent) => { setFormState({...formState, CPF: event.target.value}) } }
                        value={formState.CPF}
                        placeholder="CPF"/>

                        <InputNome 
                        onChange={[(event:InputEvent) => { setFormState({...formState, Nome: event.target.value}) },
                                   (event:InputEvent) => { setFormState({...formState, Sobrenome: event.target.value}) } ] }
                        value={[formState.Nome, formState.Sobrenome]}
                        placeholder ={["Nome", "Sobrenome"]}/>

                        <InputData
                        onChange={(event:InputEvent) => { setFormState({...formState, Nascimento: event.target.value}) }}
                        value={formState.Nascimento}
                        />

                        <InputGender
                        onChange={(event:InputEvent) => { setFormState({...formState, Genero: event.target.value}) }}
                        value={formState.Genero}/>

                        {(validarCamposIniciais())?
                            <LinkContinue left={true}
                            content="Continuar "
                            onClick={handleContinuar}/>
                            :null}
                    </div>
                }          
            </form>
        </main>
    );
}; 
