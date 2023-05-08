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
}

export interface ListaPropsA {
    className: string,
    itens: ProductModel[]
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