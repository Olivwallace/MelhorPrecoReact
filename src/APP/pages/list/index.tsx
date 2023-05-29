//----------------------- Importa Dependencias
import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from "react";
import { Map, NavBar } from "../../assets/components/";
import { AuthContext } from "../../contexts/auth/authContext";
import { FilterLists } from "../../assets/components/filters/filterList";
import { ListaAPI } from "../../service/api/ListsAPI/ListAPI";
import { useAPI } from "../../service/api/useApi";
import { ListaDate } from "../../model/dadosLista";
import './index.css';
import { ListaExibe } from "../../assets/components/List/lista";
import { ProductModel } from "../../model";
import { ListaVisualizacaoItem } from "../../assets/components/List/itemLista/itemLista";
import { ReponseSearch } from "../../service/api/HomeAPI/responseType";
import { useGetLocation } from "../../hooks/useGetLocation";

//---------------------------- Redefined Types
type InputEvent = ChangeEvent<HTMLInputElement>
type EventSubmit = React.FormEvent<HTMLFormElement>
type SelectEvent = React.ChangeEvent<HTMLSelectElement>

//----------------------- Login Page
export const Lista: React.FC = (props) => {

    const context = useContext(AuthContext)
    const useLocation = useGetLocation()
    const api = useAPI.Lista

    // Filtros Aplicados
    const [filters, setFilters] = useState({
        select: '',
        radio: 'Distance'
    });

    // Listas Usuario
    const [list, setList] = useState<ListaDate[]>()
    const obterListasUsuario = useCallback(async () => {
        let usuario = context.user?.id || context.usuario()?.id;
        let lista = []

        if (usuario) {
            lista = await api.buscarListas(usuario);
        }

        if (lista != null) {
            let list: Array<ListaDate> = [];

            lista.listas.map((element: any) => {
                delete element.userId
                delete element.itens
                list.push({
                    nomeLista: element.nomeLista,
                    idLista: element.listId
                })
            })

            localStorage.setItem("listasUser", JSON.stringify(lista.listas));
            setList(list);
        }
    }, [])

    // Lista atual
    const [atual, setAtual] = useState<ProductModel[]>([])

    // Mercados Filtrados
    const [markers, setMarkets] = useState<ReponseSearch>()





    useEffect(() => {
        obterListasUsuario();
    }, [])

    if (!useLocation) { return <h1>Carregando Dados</h1>; } // Mostra Icone de Carregamento Temporario

    //Construtor Pagina
    return (
        <>
        <main className="exibe-lista">
            <NavBar auth={true}
                namePerfil={context.user?.name}
                tags={["Home", "Nova Lista", "Enviar Notas"]}
                hrefPerfil={""}
                hrefListas={"/"}
                hrefNota={"/createList"}
                hrefSobreNos={"/nota"} />

            <FilterLists
                options={list}
                onChange={[
                    (event: SelectEvent) => { setFilters({ ...filters, select: event.target.value }) },
                    (event: InputEvent) => { setFilters({ ...filters, radio: event.target.value }) }
                ]}
                filters={filters}
                className="filter-container2"
            />

            <div className="list_map">
            <div className="lista">
            <ListaExibe
                className="cabecalho"
                itens={[
                    {
                        nomeItem: "Produto",
                        marca: "Desc",
                        unMedida: "UnMed",
                        quantidade: "Qtd",
                        mercado1: "Epa",
                        mercado2: "Super Nosso",
                        mercado3: "Carrefour"
                    }]}/>
                    
            <ListaExibe
                className="listaAtual"
                itens={[
                    {
                        nomeItem: "Feijao",
                        marca: "Camil",
                        unMedida: "1kg",
                        quantidade: 10,
                        mercado1: 5,
                        mercado2: 20,
                        mercado3: 10
                    }, {
                        nomeItem: "Feijao",
                        marca: "Feijoada",
                        unMedida: "1kg",
                        quantidade: 3,
                        mercado1: 20,
                        mercado2: 5,
                        mercado3: 10
                    }, {
                        nomeItem: "Feijao",
                        marca: "Benedita",
                        unMedida: "1kg",
                        quantidade: 10,
                        mercado1: 10,
                        mercado2: 20,
                        mercado3: 5
                    },
                    {
                        nomeItem: "Feijao",
                        marca: "Camil",
                        unMedida: "1kg",
                        quantidade: 10,
                        mercado1: 5,
                        mercado2: 20,
                        mercado3: 10
                    }, {
                        nomeItem: "Feijao",
                        marca: "Feijoada",
                        unMedida: "1kg",
                        quantidade: 3,
                        mercado1: 20,
                        mercado2: 5,
                        mercado3: 10
                    }, {
                        nomeItem: "Feijao",
                        marca: "Benedita",
                        unMedida: "1kg",
                        quantidade: 10,
                        mercado1: 10,
                        mercado2: 20,
                        mercado3: 5
                    },
                    {
                        nomeItem: "Feijao",
                        marca: "Camil",
                        unMedida: "1kg",
                        quantidade: 10,
                        mercado1: 5,
                        mercado2: 20,
                        mercado3: 10
                    }, {
                        nomeItem: "Feijao",
                        marca: "Feijoada",
                        unMedida: "1kg",
                        quantidade: 3,
                        mercado1: 20,
                        mercado2: 5,
                        mercado3: 10
                    }, {
                        nomeItem: "Feijao",
                        marca: "Benedita",
                        unMedida: "1kg",
                        quantidade: 10,
                        mercado1: 10,
                        mercado2: 20,
                        mercado3: 5
                    }
                ]}
            />
            </div>
            <Map className="mapaList" locateUser={useLocation} markers={markers?.data.markets} />
            </div>
        </main>
    </>

    );
}; 
