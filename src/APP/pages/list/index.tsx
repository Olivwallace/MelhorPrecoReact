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
import { MarketModel, ProductModel } from "../../model";
import { ListaVisualizacaoItem } from "../../assets/components/List/itemLista/itemLista";
import { ReponseSearch } from "../../service/api/HomeAPI/responseType";
import { useGetLocation } from "../../hooks/useGetLocation";
import { Marker } from "leaflet";
import { ItensMercados } from "../../model/itemMercado";

//---------------------------- Redefined Types
type InputEvent = ChangeEvent<HTMLInputElement>
type EventSubmit = React.FormEvent<HTMLFormElement>
type SelectEvent = React.ChangeEvent<HTMLSelectElement>

//----------------------- Login Page
export const Lista: React.FC = (props) => {

    const context = useContext(AuthContext)
    const useLocation = useGetLocation()
    const api = useAPI.Lista
    const api2 = useAPI.Home

    // Filtros Aplicados
    const [filters, setFilters] = useState({
        select: ' ',
        radio: 'Distance'
    });

    //Lista Final
    const [listaFinal, setListaFinal] = useState<ItensMercados[]>([])

    // Lista atual
    const [atual, setAtual] = useState<number>(-1)

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
                list.push({
                    nomeLista: element.nomeLista,
                    idLista: element.listId,
                    itens: element.itens
                })
            })

            localStorage.setItem("listasUser", JSON.stringify(lista.listas));
            setList(list);
        }
    }, [])

    // Lista de Todos os Mercados
    const [mercadosProx, setMercadosProx] = useState<ReponseSearch>()
    const obterMercados =  async() =>{
        let usuario = context.user?.id || context.usuario()?.id;
        let lista = []

        if(usuario){
            lista = await api2.perfomeSearch({
                search: "", 
                location: usuario.toLocaleString(),
                tags: ["",""]
            })
        }

        if(lista?.data){
            setMercadosProx(lista)
        }

    }

    // Mercados Filtrados
    const [mercados, setMercados] = useState<MarketModel[]>()
    

    const calcularTotal = useCallback((market: number, list: ProductModel[]) => {
        let total = 0

        if(mercadosProx?.data.markets){
            let mercado = mercadosProx.data.markets[market]
            for(let i = 0; i < list.length; i++){
                list.forEach(item =>{
                    mercado.produtos.forEach(itemM =>{
                        if(item === itemM){
                            total += (itemM.valor && item.quantidade)? item.quantidade * itemM.valor:0;
                        } 
                    })
                })
            }
        }

        return total
    },[atual])


    useEffect(() => {
        if(list && mercadosProx?.data.markets){
            let tdsMercados = mercadosProx?.data.markets
            let mercadosBarato:{ total: number, mercado: MarketModel}[] = []
            let i = 0
            tdsMercados.forEach(market=>{
                console.log(list)
                let mercadoAtual = {
                    total: calcularTotal(i, list[atual].itens),
                    mercado: market
                }
                console.log(4)
                
                if(mercadosBarato.length < 3){
                  
                    mercadosBarato.push(mercadoAtual);
                    if(mercadosBarato.length === 3) sort(mercadosBarato)
                
                }else{
                    if(mercadoAtual.total < mercadosBarato[2].total){
                        mercadosBarato[2] = mercadoAtual
                        sort(mercadosBarato)
                    }
                }
 
                i++;            
            })

            let mercados = []
            for(let i = 0; i < mercadosBarato.length; i++){
                mercados.push(mercadosBarato[i].mercado)
            }

            setMercados(mercados)
            hadlelistafinal()
        }
    },[atual])

    const hadlelistafinal = () =>{
        let lista: ItensMercados[] = []
        if(list && mercados){
            for(let i = 0; i < list[atual].itens.length; i++){
                let novo = {
                    nomeItem: list[atual].itens[i].nome,
                    mercado1: obterValor(mercados[0], list[atual].itens[i]),
                    mercado2: obterValor(mercados[1], list[atual].itens[i]),
                    mercado3: obterValor(mercados[2], list[atual].itens[i]),
                    quantidade: list[atual].itens[i].quantidade ||  '1'
                }

                lista.push(novo);
            }
        }

        setListaFinal(lista)
    }

    const obterValor = (mercado: MarketModel, produto: ProductModel) =>  {
        let retorno = 0

        if(mercado != undefined){
            console.log(mercado.nome + " " + produto.nome)
            mercado.produtos.forEach(item =>{
                console.log(item.codigo + " " + produto.codigo + " " + item.valor )
                if(produto.codigo == item.codigo) retorno = (item.valor)?item.valor:0
            })
        }

        return retorno
    }

    const sort = (itens:{ total: number, mercado: MarketModel}[]) => {
        for (var i = 0; i < itens.length; i++) {
            for (var j = 0; j < itens.length-1; j++) {
                if (itens[j].total > itens[j+1].total) {
                    var temp = itens[j];
                    itens[j] = itens[j+1];
                    itens[j+1] = temp;
                }
            }
        }
    }

    const handleAtual = (id: string) =>{
        if(list){
            for(let i = 0; i < list?.length; i++){
                if(list[i].idLista.toString() === id) setAtual(i)
            }
        }
    }

    useEffect(() => {
        obterListasUsuario();
        obterMercados()
        setAtual(0)
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
                    (event: SelectEvent) => { handleAtual(event.target.value) },
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
                        unMedida: "UnMed",
                        quantidade: "Qtd",
                        mercado1: (mercados && mercados[0])?mercados[0].nome: "N.A",
                        mercado2: (mercados && mercados[1])?mercados[1].nome: "N.A",
                        mercado3: (mercados && mercados[2])?mercados[2].nome: "N.A"
                    }]}/>
                    
            <ListaExibe
                className="listaAtual"
                itens={listaFinal}
            />
            </div>
            <Map className="mapaList" locateUser={useLocation} markers={mercados} />
            </div>
        </main>
    </>

    );
}; 
