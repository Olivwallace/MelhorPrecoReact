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
        
        
        response = await api.post("/getMercados", pesquisa)
        
        
        return response?.data;
    }


})