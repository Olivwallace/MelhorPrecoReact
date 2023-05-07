import { AxiosInstance } from "axios";
import { RegisterData } from "../../../model";
import { alter, create, excluir, search, } from "./Types";

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
        response.data.data;
    }
});
