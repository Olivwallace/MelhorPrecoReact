import React, { useCallback, useEffect, useState } from "react"
import { ListaPropsA, ListaPropsB } from "../PropsList"
import { ListaLateralItem } from "../itemLista/itemLista";
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
              />
            );
        });

        setItens(listaDeItens)
    },[props.itens])


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
