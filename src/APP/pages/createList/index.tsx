//----------------------- Importa Dependencias
import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth/authContext";
import { ListaLateralItem, ListaHomeItem, ListaVisualizacaoItem } from "../../assets/components/List/itemLista/itemLista";
import './index.css';
import { ListaCriancao, ListaLateral } from "../../assets/components/List/lista";
import { ProductModel } from "../../model";
import { useAPI } from "../../service/api/useApi";
import { NavBar, SearchBar } from "../../assets/components";


//---------------------------- Redefined Types
type InputEvent = ChangeEvent<HTMLInputElement>
type EventSubmit = React.FormEvent<HTMLFormElement>

//----------------------- Create List Page
export const CreateList: React.FC = (props) => {

    const context = useContext(AuthContext)
    const api = useAPI.Lista

    const [listName, setListName] = useState<string>('novaLista');

    const [listaBusca, setListaBusca] = useState<ProductModel[]>([]); // Lista Renderizada

    const [busca, setBusca] = useState<string>("A");
    const buscarItens = useCallback(async () => {
        let lista = await api.pesquisarItens({ busca: busca })
        setListaBusca(lista.produtos)
    }, [busca])

    //Adiciona itens a lista
    const [listaCliente, setListaCliente] = useState<ProductModel[]>([]); // Mantem Lista Cadastrada
    const handleList = (item: ProductModel) => {
        if (listaCliente.indexOf(item) == -1) setListaCliente([...listaCliente, item])
        else updateList(item, 1)
    }

    //Aumenta ou diminui itens da lista
    const updateList = (item: ProductModel, valor: number) => {
        // Crie uma cópia do array de objetos
        const novoArray = [...listaCliente];

        // Encontre o objeto com o ID correspondente
        const objetoAlvo = novoArray.find(objeto => objeto.codigo === item.codigo);

        // Verifique se o objeto foi encontrado
        if (objetoAlvo && objetoAlvo.quantidade) {
            // Altere o campo 'campoAlvo' do objeto
            objetoAlvo.quantidade += valor;

            // Atualize o estado com o novo array de objetos
            setListaCliente(novoArray);
        }
    }

    //Realiza carga inicial de itens para facilitar a busca
    useEffect(() => {
        buscarItens();
    }, [])


    //Construtor Pagina
    return (
        <main className="main">
            <NavBar auth={true}
                namePerfil={context.user?.name}
                hrefPerfil={""}
                hrefListas={""}
                hrefNota={""}
                hrefSobreNos={""} />

            <SearchBar
                search=""
                placeHolder="Busque o produto"
                onChange={() => console.log("Hello")}
                onKeyDonw={() => console.log("clicou")} />


            <ListaLateral
                className="listaBuscas"
                itens={listaBusca}
                onSelect={handleList}
                onUpdate={()=>{}}
                onDelete={()=>{}}
            />

            <input
                type="text"
                id="nomeLista"
                placeholder="Nova Lista" />

            <ListaCriancao
                className="listaUsuario"
                onSelect={() => { }}
                itens={listaCliente}
                onUpdate={updateList}
                onDelete={()=>{}} />

        </main>
    );
}; 
