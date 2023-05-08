import { AxiosInstance } from "axios";
import { RegisterData } from "../../../model";
import { alter, create, excluir, search, searchStr } from "./Types";

export const ListaAPI = (api: AxiosInstance) => ({

    criar: async (lista: create) => {
        const response = await api.post('/createLista', {lista});
        return response.data.data;
    },

    alterar: async (lista: alter) => {
        const response = await api.post('/alterLista', {lista});
        return response.data.data;
    },
     
    pesquisar: async (lista: search) => {
        const response = await api.post('/searchLista', {lista});
        return response.data.data;
    },

    excluir: async (lista: excluir) => {
        const response = await api.post('/createLista', {lista});
        return response.data.data;
    },

    pesquisarItens: async(busca: searchStr) =>{
        return {
                produtos: [{
                    codigo: "1121312312",
                    nome: "Refrigerante Coca Cola",
                    marca: "Coca-Cola",
                    descricao: "Refrigerante de Cola",
                    unMedida: "2L",
                    avaliacao: 4
                },{
                    codigo: "112122312",
                    nome: "Refrigerante Pespsi Cola",
                    marca: "Pespsi",
                    descricao: "Refrigerante de Cola",
                    unMedida: "2L",
                    avaliacao: 4
                }
            ]
        }
        const response = await api.post('/buscaProduto', {busca})
        return response.data.data
    }
});
