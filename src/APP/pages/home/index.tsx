//----------------------- Importa Dependencias
import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from "react";
import { Map } from "../../assets/components/";
import { AuthContext } from "../../contexts/auth/authContext";
import { useGetLocation } from "../../hooks/useGetLocation";
import { MarketModel, ProductModel, PromotionsModel, SearchType  } from "../../model";
import { SearchBarHome } from "../../assets/components/";
import { useAPI } from "../../service/api/useApi";
import { ListHome } from "../../assets/components/List/ListHome/listHome";
import { ReponseSearch } from "../../service/api/HomeAPI/responseType";


//---------------------------- Redefined Types
type InputEvent = ChangeEvent<HTMLInputElement>
type SelectEvent = React.ChangeEvent<HTMLSelectElement>

//----------------------- Login Page
export const Home: React.FC = (props) => {

    const context = useContext(AuthContext)
    const useLocation = useGetLocation()
    const api = useAPI.Home

    const [markers, setMarkets] = useState<ReponseSearch>()
    const [list, setList] = useState<ProductModel | PromotionsModel>()

    const [searchState, setSearch] = useState({
        text: "",
        select: 'Promotion',
        radio: 'Distance'
    });

    const listenerKeyboard = useCallback((event: React.KeyboardEvent) => {
        if(event.key === 'Enter') handleShearch();
    },[props])

    const handleShearch = useCallback(async () => {
        const search = {
            search: searchState.text, 
            location: useLocation?.lat + "," + useLocation?.lng,
            tags: [searchState.select, searchState.radio]
        }
        
        let resp = await api.perfomeSearch(search)
        
        if(resp.status === 200){
            setMarkets(resp)
            //setListSearch(resp.response)
        }

    },[props])


    useEffect(() => {
        handleShearch()
    },[searchState.radio, searchState.select])

    useEffect(() => {

    }, [markers?.response])


    if(!useLocation) { return <h1>Carregando Dados</h1>;} // Mostra Icone de Carregamento Temporario

    //Construtor Pagina
    return (
        <>
            <header>
                {(context && context.user)? null: "Menu Sem User"}
            </header>
            <main>
                <SearchBarHome onChange={[
                        (event:SelectEvent) => {setSearch({... searchState, select: event.target.value})},
                        (event:InputEvent)  => {setSearch({... searchState, radio: event.target.value })},
                        (event:InputEvent)  => {setSearch({...searchState, text: event.target.value})}
                    ]}
                    onKeyDonw={listenerKeyboard} 
                    search={searchState}/>

                <Map locateUser={useLocation} markers={markers?.response.markets} positionCSS={'relative'}/>
                
                {(markers?.response)?listar():null}
            </main>
        </>
    );
}
