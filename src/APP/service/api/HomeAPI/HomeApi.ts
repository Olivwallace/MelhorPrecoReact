import { AxiosInstance } from "axios";
import { SearchType } from "../../../model";
import { ReponseSearch } from "./responseType";

export const HomeAPI = (api: AxiosInstance) => ({

    perfomeSearch: async (search: SearchType):Promise<ReponseSearch> => {
        return {
            status: 200,
            response: {
                markets: [{
                    nome: "Epa",
                    endereco: "Rua Coração Eucarístico de Jesus, 86 - Coração Eucarístico, Belo Horizonte - MG, 30535-460",
                    coords: ["-19.92648878", "-43.98874015"]
                },{
                    nome: "Super Nosso",
                    endereco: "R. Dom José Pereira Lara, 33 - Coração Eucarístico, Belo Horizonte - MG, 30535-520",
                    coords: ["-19.92426973", "-43.9865461"]
                },{
                    nome: "Dia",
                    endereco: "Av. Ver. Cícero Ildefonso, 855 - João Pinheiro, Belo Horizonte - MG, 30530-000",
                    coords: ["-19.92563647", "-44.00087446"]
                }],
                product: [],
                promotion: []
            }
        }
        const response = await api.post('/getMercados', search)
    },

    getPromotions: async () => {

    }

})