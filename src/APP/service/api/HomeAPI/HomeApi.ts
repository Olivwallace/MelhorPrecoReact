import { AxiosInstance } from "axios";
import { SearchType } from "../../../model";
import { ReponseSearch } from "./responseType";
import { Marker } from "leaflet";

export const HomeAPI = (api: AxiosInstance) => ({

    perfomeSearch: async (search: SearchType) => {
        let response;
        let pesquisa = {
            text: search.search,
            localizacao: search.location
        }
        
        if(search.tags[0] == 'Market'){
            response = await api.post("/getMercados", pesquisa)
        }else{
            response = await api.post("/getMercados", pesquisa)
            /*switch (search.tags[1]) {
                case 'rating':
                    response = await api.post('/getProductRating', pesquisa);
                    break;
                case 'distance':
                    response = await api.post('/getProductDistance', pesquisa);
                    break;
                case 'price':
                    response = await api.post('/getProductPrice', pesquisa);
                    break;
            }*/
        }
        
        return response?.data;
    }


})