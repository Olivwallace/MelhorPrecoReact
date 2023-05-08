import React from "react"
import { ItemListaProps } from "../PropsList"
import { ReactComponent as PriceSVG } from "./img/price.svg"
import { ReactComponent as AddSVG } from "./img/add.svg"
import { ReactComponent as DelSVG} from "./img/delete.svg"
import { ReactComponent as UpdateSVG} from "./img/update.svg"


import { HalfRating } from "../../rating/rating"

export const ListaHomeItem: React.FC<ItemListaProps> = (props) => {
    return(
        <div className={props.className}>
                <div className="mercado" style={(props.mercado != null)?{}:{'display': 'none'}}>
                    {props.mercado}
                </div>

                {(props.promocionado)?<PriceSVG />:null}
                
                <div className="validadeOferta" style={(props.promocionado)?{}:{'display': 'none'}}>
                    {(props.promocionado)?"Oferta valida até: " + props.condicaoPromocao: null}
                </div>

                <div className="item" >
                    {props.nomeItem}
                </div>
                
                <div className="marca">
                    {props.marca}
                </div>
                
                <div className="desc">
                    {props.descricao}
                </div>
                
                <div className="unMedida">
                    {props.unidadeMedida}
                </div>
                
                <div className="valor" style={(props.valor == null)?{'display': 'none'}:{}}>
                    {(props.valor)?"R$ " + props.valor.toFixed(2): null}
                </div>
                
                <div className="avaliacao">{<HalfRating rating={props.avaliacao}/>}</div>
                <div className="acoes" style={{'display': ''}}>
                    <AddSVG/>
                </div>
        </div>
    )    
}

export const ListaLateralItem: React.FC<ItemListaProps> = (props) => {
    return(
        <div className={props.className}>
                <div className="item" >
                    {props.nomeItem}
                </div>
                
                <div className="marca">
                    {props.marca}
                </div>
                
                <div className="desc">
                    {props.descricao}
                </div>
                
                <div className="unMedida">
                    {props.unidadeMedida}
                </div>
                
                <div className="avaliacao">
                    {<HalfRating rating={props.avaliacao}/>}
                </div>
                
                <div className="acoes" style={{'display': ''}}>
                    <AddSVG/>
                    <DelSVG/>
                    <UpdateSVG/>
                </div>
        </div>
    )    
}

