import { ProductModel } from "./productModel";
import { PromotionsModel } from "./promotionsModel";

export type MarketModel = {
    nome: string,
    cnpj: string,
    endereco: string,
    numero?: number,
    cep?: string,
    cidade?: string,
    estado?: string,
    coords: string[],
    avaliacao?: number,
    produtos: ProductModel[]
}