import { MarketModel, ProductModel, PromotionsModel } from "../../../model";

export type ReponseSearch = {
    status: number,
    response: {
        markets: MarketModel[]
        product: ProductModel[] | null
        promotion: PromotionsModel[] | null
    }
}
