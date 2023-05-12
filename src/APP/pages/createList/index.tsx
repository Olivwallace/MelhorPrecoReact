//----------------------- Importa Dependencias
import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth/authContext";
import { ListaLateralItem, ListaHomeItem, ListaVisualizacaoItem } from "../../assets/components/List/itemLista/itemLista";
import './index.css';
import { ListaLateral } from "../../assets/components/List/lista";
import { ProductModel } from "../../model";
import { useAPI } from "../../service/api/useApi";
import { NavBar, SearchBar } from "../../assets/components";


//---------------------------- Redefined Types
type InputEvent = ChangeEvent<HTMLInputElement>
type EventSubmit = React.FormEvent<HTMLFormElement>

//----------------------- Create List Page
export const CreateList: React.FC = (props) => {

    const context = useContext(AuthContext)
    const api = useAPI.Create

    const [listaBusca, setListaBusca] = useState<ProductModel[]>([]); // Lista Renderizada
    const [listaCliente, setListaCliente] = useState<ProductModel[]>([]); // Mantem Lista Cadastrada

    const [busca, setBusca] = useState<string>("A");
    const buscarItens = useCallback(async () => {
        let lista = await api.pesquisarItens({ busca: busca })
        setListaBusca(lista.produtos)
    }, [busca])

    //Realiza carga inicial de itens para facilitar a busca
    useEffect(() => {
        buscarItens();
    }, [])

    const handleSubmit = useCallback(async (event: EventSubmit) => {
        event.preventDefault();
        console.log("to aqui");
    }, [listaCliente]);

    //Construtor Pagina
    return (
        <><NavBar auth={true}
            namePerfil={""}
            hrefPerfil={""}
            hrefListas={""}
            hrefNota={""}
            hrefSobreNos={""} /><main className="main-lista">

                <div>
                    <form className="form-Lista" onSubmit={handleSubmit}>
                        <div className="divPesquisa">
                            <SearchBar
                                search=""
                                placeHolder="Busque o produto"
                                onChange={() => console.log("Hello")}
                                onKeyDonw={() => console.log("clicou")} />

                            <ListaLateral
                                className="listaBuscas"
                                itens={listaBusca}
                                onSelect={() => { } } />
                        </div>
                        <div className="div2">
                            <input
                            className="inputLista"
                                type="text"
                                id="nomeLista"
                                placeholder="Nova Lista" />
                            <div className="divLista"></div>
                            <button className="btn-envio" type="submit">Salvar lista</button>
                        </div>
                    </form>
                </div>

            </main></>
    );
}; 
