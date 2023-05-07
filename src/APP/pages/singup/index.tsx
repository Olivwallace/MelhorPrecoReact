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
//---------------------- Inporta CSS
import './signup.css'; 
import imgC from './img/cadastro.svg';
import progressBar1 from './img/progressBar1.svg';
import progressBar2 from './img/progressBar2.svg';
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
                        'loginData': { email: formState.Email, password: formState.Pass,token:"" }}

        let registrado;
        event.preventDefault()

        if(validarCamposIniciais() && validarCamposFinais()){
            registrado = await context.singup(novoUser)
            navigate('/login');
        }

    },[formState.CPF, formState.Email])


    //Construtor Pagina
    return (
        <main className="main-containerC">
            
            <div>
             <img className="imgL" src={imgC} alt="" />
            </div>

            <form className="form-containerC" onSubmit={handleRegister}>

                    
                {(formState.continuar)?
                    <div>
                        <img src={progressBar2} alt="" />
                        <div className="botaoVoltar">  
                        <LinkContinue right={true} 
                          class="linkV"
                        content="" 
                        icon={<HiOutlineArrowLeft size={30}/>} 
                        onClick={handleContinuar}/></div>
                        <label className="labelC">Email</label>
                        <InputEmailValid
                        className="divInputEmail"
                        onChange={[(event:InputEvent) => { setFormState({...formState, Email: event.target.value}) },
                                   (event:InputEvent) => { setFormState({...formState, ValidarEmail: event.target.value}) } ] }
                        value={[formState.Email, formState.ValidarEmail]}
                        placeholder ={["Email", "Confirmar Email"]}/>
                        <label className="labelC">Senha</label>
                        <InputPassConfirm
                        className="divInputSenha"
                        onChange={[(event:InputEvent) => { setFormState({...formState, Pass: event.target.value}) },
                                   (event:InputEvent) => { setFormState({...formState, ValidarPass: event.target.value}) } ] } 
                        value={[formState.Pass, formState.ValidarPass]}
                        placeholder={["Senha", "Confirma Senha"]}/>

                        
                        <BtnCadastro class="botaoConcluir" disebled={!validarCamposFinais()} onClick={console.log}/>
                    </div>
                    :
                    <div>
                        <img src={progressBar1} alt="" />
                        <h2 className="cadastro">Novo Usuario</h2>
                        <label className="labelC">CPF</label>
                        <InputCPF 
                        className="divInputCPF"
                        onChange={(event:InputEvent) => { setFormState({...formState, CPF: event.target.value}) } }
                        value={formState.CPF}
                        placeholder="CPF"/>
                        <label className="labelC">Nome</label>
                        <InputNome 
                        className="divInputNome"
                        onChange={[(event:InputEvent) => { setFormState({...formState, Nome: event.target.value}) },
                                   (event:InputEvent) => { setFormState({...formState, Sobrenome: event.target.value}) } ] }
                        value={[formState.Nome, formState.Sobrenome]}
                        placeholder ={["Nome", "Sobrenome"]}/>
                        <label className="labelC">Data de Nascimento</label>
                        <InputData
                        className="divInputData"
                        onChange={(event:InputEvent) => { setFormState({...formState, Nascimento: event.target.value}) }}
                        value={formState.Nascimento}
                        />
                        <label className="labelC">Gênero</label>
                        <InputGender
                        className="divInputGender"
                        onChange={(event:InputEvent) => { setFormState({...formState, Genero: event.target.value}) }}
                        value={formState.Genero}/>

                        {(validarCamposIniciais())?
                            <div className="botaoContinuar"><LinkContinue
                            class="linkC"
                            left={true}
                            content="Continuar "
                            onClick={handleContinuar}/></div>
                            :null}
                    </div>
                }       
                 <div className="linkLogin"><label style={{color:"#fff"}} >É novo por aqui? </label> <LinkLogin  href="/login"/></div>

            </form>
        </main>
    );
}; 
