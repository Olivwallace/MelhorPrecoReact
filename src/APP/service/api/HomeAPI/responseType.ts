import { MarketModel, ProductModel, PromotionsModel } from "../../../model";

export type ReponseSearch = {
    status: number,
    messenger: string,
    data: {
        markets: MarketModel[]
    }
}
