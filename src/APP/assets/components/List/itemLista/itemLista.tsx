import React, { useCallback, useEffect, useState } from "react"
import { ItemListaProps, ItemListaVisualizacaoProps, PropsList } from "../PropsList"
import { ReactComponent as PriceSVG } from "./img/price.svg"
import { ReactComponent as AddSVG } from "./img/add.svg"
import { ReactComponent as DelSVG } from "./img/delete.svg"
import { ReactComponent as SubSVG } from "./img/sub.svg"
import { ReactComponent as HighPrice } from "./img/1.svg"
import { ReactComponent as StablePrice } from "./img/3.svg"
import { ReactComponent as LowPrice } from "./img/2.svg"


import { HalfRating } from "../../rating/rating"

export const ListaHomeItem: React.FC<ItemListaProps> = (props) => {
    return (
        <div className={props.className}>
            <div className="mercado" style={(props.mercado != null) ? {} : { 'display': 'none' }}>
                {props.mercado}
            </div>

            {(props.promocionado) ? <PriceSVG /> : null}

            <div className="validadeOferta" style={(props.promocionado) ? {} : { 'display': 'none' }}>
                {(props.promocionado) ? "Oferta valida até: " + props.condicaoPromocao : null}
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

            <div className="valor" style={(props.valor == null) ? { 'display': 'none' } : {}}>
                {(props.valor) ? "R$ " + props.valor.toFixed(2) : null}
            </div>

            <div className="avaliacao">{<HalfRating rating={props.avaliacao} />}</div>
        </div>
    )
}

export const ListaLateralItem: React.FC<ItemListaProps> = (props) => {
    return (
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
                {<HalfRating rating={props.avaliacao} />}
            </div>

            <div className="acoes" style={{ 'display': '' }} onClick={props.onClickButton}>
                <AddSVG />
            </div>
        </div>
    )
}

export const ListaVisualizacaoItem: React.FC<ItemListaVisualizacaoProps> = (props) => {

    const [ordemValores, setOrdemValores] = useState<(string | number)[]>([]);
    const handleOrdem = useEffect(() => {
        if (props.valor1 && props.valor2 && props.valor3) {
            let valores = [props.valor1, props.valor2, props.valor3];
            valores.sort()
            setOrdemValores(valores)
        }
    }, [])


    const obterIcone = useCallback((valor: number) => {
        let retorno = <HighPrice />

        if (valor === ordemValores[0]) retorno = <LowPrice />
        else if (valor === ordemValores[1]) retorno = <StablePrice />

        return retorno;
    }, [props])


    return (
        <div className={props.className}>
            <div className="item" >
                {props.nomeItem}
            </div>

            <div className="quantidade">
                <div className="add" onClick={props.onClickButtonAdd}>
                    {(props.alteravel) ? <AddSVG /> : null}
                </div>

                <div className="qtd">
                    {props.quantidade}
                </div>

                <div className="sub" onClick={props.onClickButtonSub}>
                    {(props.alteravel) ? <SubSVG /> : null}
                </div>
            </div>

            <div className="valores">
                <div className="valor1">
                    {(props.valor1 && typeof props.valor1 == "number") ? props.valor1.toFixed(2) : props.valor1}
                    {(props.valor1 && typeof props.valor1 == "number") ? obterIcone(props.valor1) : null}
                </div>

                <div className="valor2">
                    {(props.valor2 && typeof props.valor2 == "number") ? props.valor2.toFixed(2) : props.valor2}
                    {(props.valor2 && typeof props.valor2 == "number") ? obterIcone(props.valor2) : null}
                </div>

                <div className="valor3">
                    {(props.valor3 && typeof props.valor3 == "number") ? props.valor3.toFixed(2) : props.valor3}
                    {(props.valor3 && typeof props.valor3 == "number") ? obterIcone(props.valor3) : null}
                </div>
            </div>

            <div className="del" onClick={props.onClickButtonRem}>
                {(props.alteravel) ? <DelSVG fill="#FF0000" /> : null}
            </div>
        </div>
    )
}

