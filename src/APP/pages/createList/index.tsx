//----------------------- Importa Dependencias
import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth/authContext";
import { ListaLateralItem, ListaHomeItem } from "../../assets/components/List/itemLista/itemLista";
import './index.css'; 
import { ListaLateral } from "../../assets/components/List/lista";
import { ProductModel } from "../../model";
import { useAPI } from "../../service/api/useApi";


//---------------------------- Redefined Types
type InputEvent = ChangeEvent<HTMLInputElement>
type EventSubmit = React.FormEvent<HTMLFormElement>

//----------------------- Create List Page
export const CreateList: React.FC = (props) => {

    const api = useAPI.Create

    const [listaBusca, setListaBusca] = useState<ProductModel[]>([]); // Lista Renderizada
    const [listaCliente, setListaCliente] = useState<ProductModel[]>([]); // Mantem Lista Cadastrada

    const [busca, setBusca] = useState<string>("A");
    const buscarItens = useCallback(async () => {
        let lista = await api.pesquisarItens({busca: busca})
        setListaBusca(lista.produtos)
    },[busca])

    useEffect(()=>{
        buscarItens();
    },[])


    //Construtor Pagina
    return (
        <>
            <ListaLateral className="listaBuscas"
                itens={listaBusca}/>
        </>
    );
}; 
