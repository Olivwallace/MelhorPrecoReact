//----------------------- Importa Dependencias
import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth/authContext";
import { ListaLateralItem, ListaHomeItem, ListaVisualizacaoItem } from "../../assets/components/List/itemLista/itemLista";
import './index.css';
import { ListaCriacao, ListaLateral } from "../../assets/components/List/lista";
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

    const [busca, setBusca] = useState<string>("");
    const buscarItens = useCallback(async () => {
        let lista = await api.pesquisarItens({ busca: busca })
        setListaBusca((lista.produtos != "[]") ? lista.produtos : listaBusca)
    }, [props, busca])

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

            if(valor == -1 && (objetoAlvo.quantidade + valor) < 1) removeItem(objetoAlvo);
            else{
                // Altere o campo 'campoAlvo' do objeto
                objetoAlvo.quantidade += valor;

                // Atualize o estado com o novo array de objetos
                setListaCliente(novoArray);
            }
        }
    }

    const removeItem = (item: ProductModel) => {
        // Crie uma cópia do array de objetos
        const novoArray = listaCliente.filter((i, index) => i.codigo !== item.codigo);
        setListaCliente(novoArray);
    }

    //Realiza carga inicial de itens para facilitar a busca
    useEffect(() => {
        buscarItens();
    }, [])

    // Cria lista
    const handleSubmit = useCallback(async () => {
        let usuario = context.usuario();

        let req = {
            user: (usuario != null) ? usuario.id : -1,
            nomeLista: listName,
            produtos: listaCliente
        }

        let response = await api.criar(req)
    }, [listaCliente, listName]);


    //Efetua busca em tempo real
    useEffect(() => {
        buscarItens()
    }, [busca])


    //Construtor Pagina
    return (
        <main className="main">
            <NavBar auth={true}
                namePerfil={context.user?.name}
                tags={["Home", "Exibir Listas", "Enviar Notas"]}
                hrefPerfil={""}
                hrefListas={"/"}
                hrefNota={"/lists"}
                hrefSobreNos={"/nota"} />

            <div className="barraBusca">
                <SearchBar
                    search={busca}
                    placeHolder="Busque o produto"
                    onChange={(event: InputEvent) => { setBusca(event.target.value) }}
                    onKeyDonw={() => console.log("clicou")} />
            </div>



            <ListaLateral
                className="listaBuscas"
                itens={listaBusca}
                onSelect={handleList}
                onUpdate={() => { }}
                onDelete={() => { }}
            />

            <div className="listaExibe">
                <input
                    type="text"
                    id="nomeLista"
                    placeholder="Nova Lista"
                    onChange={(event) => {setListName(event.target.value)}} />

                <button
                    disabled={listaCliente.length < 1}
                    className="salvar"
                    onClick={handleSubmit}>Salvar</button>

                <ListaCriacao
                    className="listaUsuario"
                    onSelect={() => { }}
                    itens={listaCliente}
                    onUpdate={updateList}
                    onDelete={removeItem} />


            </div>

        </main>
    );
}; 
