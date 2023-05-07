//----------------------- Importa Dependencias
import React, { ChangeEvent, useContext } from "react";
import { Map } from "../../assets/components/";
import { AuthContext } from "../../contexts/auth/authContext";

//---------------------------- Redefined Types
type InputEvent = ChangeEvent<HTMLInputElement>
type EventSubmit = React.FormEvent<HTMLFormElement>

//----------------------- Login Page
export const Lista: React.FC = (props) => {

    const context = useContext(AuthContext)

    //Construtor Pagina
    return (
        <>
            {(context.user) ? "<main/> ": "Nao ha user"}
            <main>
                <h1>Lista</h1>
            </main>
        </>
    );
}; 
