import { MarketModel, ProductModel } from "../../../model";

export interface ItemListaProps {
    className: string,
    mercado?: string,
    nomeItem?: string,
    marca?:string,
    descricao?: string,
    unidadeMedida?: string,
    valor?: number,
    promocionado?: boolean,
    condicaoPromocao?: string,
    avaliacao: number,
    onClickButton?: () => void
}

export interface ItemListaVisualizacaoProps{
    className: string,
    alteravel: boolean,
    nomeItem?: string,
    valor1?: number | string,
    valor2?: number | string,
    valor3?: number | string,
    quantidade?:number | string
    onClickButtonAdd?: () => void
    onClickButtonSub?: () => void
    onClickButtonRem?: () => void
}

export interface ListaPropsA {
    className: string,
    itens: ProductModel[]
    onSelect?: (item: ProductModel) => void
}

export interface ListaPropsB {
    className: string,
    itens: MarketModel[]
    onSelect?: (market: MarketModel) => void
}






export interface PropsList {
    className: string,
    nameList: string
}
export type produto = { 
    id: number;
    nome: string;
    }
 export interface produtoBD{
    produto: Array<produto>;
 }