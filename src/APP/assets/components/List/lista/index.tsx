import React, { useCallback, useEffect, useState } from "react"
import { ListaPropsA } from "../PropsList"
import { ListaLateralItem } from "../itemLista/itemLista";
import { MarketModel, ProductModel } from "../../../../model";

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
