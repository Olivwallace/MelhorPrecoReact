import { AxiosInstance } from "axios";
import { SearchType } from "../../../model";
import { ReponseSearch } from "./responseType";

export const HomeAPI = (api: AxiosInstance) => ({

    perfomeSearch: async (search: SearchType):Promise<ReponseSearch> => {
        return {
            status: 200,
            messenger:"sucess",
            data: {
                markets: [{
                    nome: "Epa",
                    cnpj: "111.111.111.111-11",
                    endereco: "Rua Coração Eucarístico de Jesus",
                    numero: 86,
                    cep:  "30535-460",
                    estado: "MG",
                    cidade: "Belo Horizonte",
                    coords: ["-19.92648878", "-43.98874015"],
                    avaliacao:3,
                    produtos:[]
                },{
                    nome: "Epa",
                    cnpj: "111.111.111.111-11",
                    endereco: "Rua Coração Eucarístico de Jesus",
                    numero: 86,
                    cep:  "30535-460",
                    estado: "MG",
                    cidade: "Belo Horizonte",
                    coords: ["-19.92648878", "-43.98874015"],
                    avaliacao:3,
                    produtos:[]
                },{
                    nome: "Epa",
                    cnpj: "111.111.111.111-11",
                    endereco: "Rua Coração Eucarístico de Jesus",
                    numero: 86,
                    cep:  "30535-460",
                    estado: "MG",
                    cidade: "Belo Horizonte",
                    coords: ["-19.92648878", "-43.98874015"],
                    avaliacao:3,
                    produtos:[]
                }]
            }
        }
        const response = await api.post('/getMercados', search)
    },


})