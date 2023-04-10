//----------------------- Importa Dependencias
import React, { ChangeEvent, useContext } from "react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

//---------------------------- Redefined Types
type InputEvent = ChangeEvent<HTMLInputElement>
type EventSubmit = React.FormEvent<HTMLFormElement>

//----------------------- Login Page
export const Home: React.FC = (props) => {

    const navigate = useNavigate();

    //Construtor Pagina
    return (
        <main>
            <h1>HOME</h1>
        </main>
    );
}; 