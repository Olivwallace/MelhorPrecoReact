import React, { useCallback, useEffect, useState } from "react"
import { ListaPropsA, ListaPropsB } from "../PropsList"
import { ListaLateralItem, ListaVisualizacaoItem } from "../itemLista/itemLista";
import { ListaHomeItem } from "../itemLista/itemLista";

export const ListaLateral: React.FC<ListaPropsA> = (props) => {
    
    const [itens, setItens] = useState<React.ReactNode[]>([])

    useEffect(()=>{
        const listaDeItens = props.itens.map((element, index) => {
            return (
              <ListaLateralItem
                key={element.codigo}
                className="createLista"
                avaliacao={element.avaliacao}
                nomeItem={element.nome}
                marca={element.marca}
                descricao={element.descricao}
                unidadeMedida={element.unMedida}
                onClickButton={() => props.onSelect(element)}
              />
            );
        });

        setItens(listaDeItens)
    },[props])


    return(
        <div className={props.className}>
            {itens}
        </div>
    )
}

export const ListaLateralHome: React.FC<ListaPropsB> = (props) => {
    
    const [itens, setItens] = useState<React.ReactNode[]>([])

    useEffect(()=>{
        const listaDeItens = props.itens.map((element, index) => {
            return(
                element.produtos.map((item, index) =>{
                    return(
                        <ListaHomeItem
                            key={item.codigo}
                            className="homeLista"
                            mercado={element.nome}
                            nomeItem={item.nome}
                            marca={item.marca}
                            descricao={item.descricao}
                            unidadeMedida={item.unMedida}
                            valor={item.valor}
                            promocionado={item.promocionado}
                            condicaoPromocao={item.validadeOferta}
                            avaliacao={item.avaliacao}/>
                    )       
                })
            )
        });

        setItens(listaDeItens)
    },[props.itens])


    return(
        <div className={props.className}>
            {itens}
        </div>
    )
}

export const ListaCriancao: React.FC<ListaPropsA> = (props) => {
    const [itens, setItens] = useState<React.ReactNode[]>([])
    

    useEffect(()=>{
        const listaDeItens = props.itens.map((element, index) => {
            return (
                <ListaVisualizacaoItem
                className="produtos"
                key={element.codigo}
                onClickButtonAdd={() => props.onUpdate(element, 1)}
                onClickButtonRem={()=>{}}
                onClickButtonSub={() => props.onUpdate(element, -1)}
                quantidade={(element.quantidade)?element.quantidade:element.quantidade = 1}
                alteravel={true}
                nomeItem={element.nome}
                />
            );
        });

        setItens(listaDeItens)
    },[props])


    return(
        <div className={props.className}>
            {itens}
        </div>
    )
}
