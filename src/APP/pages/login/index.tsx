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
                logado = await context.loginKeep({ email: email, pass: password });
            } else {
                logado = await context.login({ email: email, pass: password });
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
        <main>

            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                
                <InputEmail 
                    onChange={handleEmail} 
                    placeholder="Email"
                    id="email" 
                    value={email} />

                <InputPass 
                    onChange={handlePassword}
                    placeholder="Senha"
                    id="password" 
                    value={password} />

                <BtnLogin disebled={(!(validEmail(email) && validPassword(password)))}
                sizeIcon={25}/>


                <KeepLogin label="Salvar Login" checked={keep} onChange={handleKeep}/>


                <div className="error">{errMessage}</div>

                <Link to="/forgotPass">Esqueci a senha.</Link>
            </form>

            <div>
                <h1>Olá, é novo por aqui?</h1>
                <h3>Não perca a oportunidade de economizar!</h3>
                <LinkCadastro href="/singup" sizeIcon={30}/>
            </div>

        </main>
    );
}; 