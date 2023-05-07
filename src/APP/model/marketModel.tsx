import { ProductModel } from "./productModel";
import { PromotionsModel } from "./promotionsModel";

export type MarketModel = {
    nome: string,
    endereco: string,
    coords: string[],
    avaliacao: number,
    produtos: ProductModel[]
    promocoes: PromotionsModel[]
}