//----------------------- Importa Dependencias
import React, { ChangeEvent, useContext } from "react";
import { useCallback, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

//----------------------- Importa Componentes
import { BtnLogin, InputEmail, InputPass, LinkCadastro, KeepLogin } from "../../assets/components";

//----------------------- Importa Context
import { AuthContext } from "../../contexts/auth/authContext";

//----------------------- Importa Uteis
import { validEmail, validPassword } from "../../assets/scripts/usefulValidation";

//---------------------- Importa CSS
import './login.css';
//----------------------- Importa imagens
import logo from './img/logo.png';
import imgL from './img/login.svg';

//---------------------------- Redefined Types
type InputEvent = ChangeEvent<HTMLInputElement>
type EventSubmit = React.FormEvent<HTMLFormElement>

//----------------------- Login Page
export const Login : React.FC = (props) => {

    const navigate = useNavigate();

    //Atualiza Email
    const [email, setEmail] = useState('');
    const handleEmail = useCallback((event: InputEvent) => {
        setMessage('');
        const value = event.target.value;
        setEmail(value);
    }, [email]);


    //Atualiza Senha
    const [password, setPassword] = useState('');
    const handlePassword = useCallback((event: InputEvent) => {
        setMessage('');
        const value = event.target.value;
        setPassword(value);
    }, [password]);

    
    //Mante-se Logado
    const [keep, setKeep] = useState(false);
    const handleKeep = useCallback((event: InputEvent) => {
        const value = event.target.checked;
        setKeep(value);
    }, [keep]);


    //Realiza Login
    const context = useContext(AuthContext);
    const handleLogin = useCallback(async (event: EventSubmit) => {
        let logado = false;
        event.preventDefault();

        if (validEmail(email) && validPassword(password)) {
            
            if (keep) {
                logado = await context.loginKeep({ email: email, password: password,token:"" });
            } else {
                logado = await context.login({ email: email, password: password,token:"" });
            }


            if (logado) {
                navigate('/');
            } else {
                setMessage("Dados Invalidos!");
                alert("Falha ao realizar login");
            }
        }

    }, [email, password, keep]);


    //State de erro em autenticação
    const [errMessage, setMessage] = useState('');


    //Construtor Pagina
    return (
        <main className="main-containerL" >

            <div>
            <img className="imgL" src={imgL}/>
            </div>
            <div> 
                <form className="form-containerL" onSubmit={handleLogin}> 
                <div className="divB">
                    <div> 
                    <h3>Bem vindo(a) de volta!!</h3><img className="imgLogo" src={logo}/>
                    </div>
                <p>Faça seu login, e comece a economizar</p>
                </div>        
                    <label className="label">Email</label>  
                    <InputEmail 
                        className="inputEmailL"
                        onChange={handleEmail} 
                        placeholder="Email"
                        id="email" 
                        value={email} />
                        <label className="label">Senha</label>  
                    <InputPass 
                        className="inputSenhaL"
                        onChange={handlePassword}
                        placeholder="Senha"
                        id="password" 
                        value={password} />
                    <div className="divES">
                        <KeepLogin label="Salvar Login" checked={keep} onChange={handleKeep}/>
                        <Link className="link" to="/forgotPass">Esqueceu a senha?</Link>
                    </div>
                    <div className="error">{errMessage}</div>
                    <BtnLogin class="botaoSubmit" disebled={(!(validEmail(email) && validPassword(password)))}sizeIcon={25}/>
                    <div className="linkCadastro"><label style={{color:"#fff"}} >É novo por aqui? </label><LinkCadastro class="link" href="/singup"/></div>
                </form>         
            </div>
        </main>
    );
}; 