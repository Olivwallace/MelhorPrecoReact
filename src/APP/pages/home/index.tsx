//----------------------- Importa Dependencias
import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from "react";
import { Map } from "../../assets/components/";
import { AuthContext } from "../../contexts/auth/authContext";
import { useGetLocation } from "../../hooks/useGetLocation";
import { MarketModel, ProductModel, PromotionsModel, SearchType  } from "../../model";
import { SearchBarHome } from "../../assets/components/";
import { useAPI } from "../../service/api/useApi";
import { ReponseSearch } from "../../service/api/HomeAPI/responseType";
import {NavBar} from "../../assets/components/NavBar/NavBar";
import './index.css'; 

//---------------------------- Redefined Types
type InputEvent = ChangeEvent<HTMLInputElement>
type SelectEvent = React.ChangeEvent<HTMLSelectElement>

//----------------------- Login Page
export const Home: React.FC = (props) => {

    const context = useContext(AuthContext)
    const useLocation = useGetLocation()
    const api = useAPI.Home

    const [markers, setMarkets] = useState<ReponseSearch>()

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
        handleShearch()
    }, [])

   // useEffect(() => {
    //    handleShearch()
    //}, [markers?.data])


    if(!useLocation) { return <h1>Carregando Dados</h1>;} // Mostra Icone de Carregamento Temporario

    //Construtor Pagina
    return (
        <>
  
            <main className="main">
                   
            <div className="div1"> {
                    (context.user || context.session())? 
                    <NavBar auth = {true}
                     namePerfil={context.user?.name} 
                     hrefPerfil={""} 
                     hrefListas={""} 
                     hrefNota={""} 
                     hrefSobreNos={""}/>
                    :
                    <NavBar auth = {false}
                     namePerfil={""} 
                     hrefPerfil={""} 
                     hrefListas={"/login"} 
                     hrefNota={"/Singup"} 
                     hrefSobreNos={"/sobreNos"}/>
                    }</div>
                <div className="mapaSearch"><SearchBarHome onChange={[
                        (event:SelectEvent) => {setSearch({... searchState, select: event.target.value})},
                        (event:InputEvent)  => {setSearch({... searchState, radio: event.target.value })},
                        (event:InputEvent)  => {setSearch({...searchState, text: event.target.value})}
                    ]}
                    onKeyDonw={listenerKeyboard} 
                    search={searchState}/>

                <Map locateUser={useLocation} markers={markers?.data.markets} positionCSS={'relative'}/></div>
                
            </main>
        </>
    );
}
