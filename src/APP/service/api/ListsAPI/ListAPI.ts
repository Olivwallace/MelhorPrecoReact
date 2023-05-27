import { AxiosInstance } from "axios";
import { RegisterData } from "../../../model";
import { alter, create, excluir, search, searchStr } from "./Types";

export const ListaAPI = (api: AxiosInstance) => ({

    criar: async (lista: create) => {
        let itens: { codigo: string; quantidade: number | undefined; }[] = []

        lista.produtos.forEach(element => {
            itens.push({
                codigo: element.codigo,
                quantidade: element.quantidade
            })
        });

        const response = await api.post('/createLista', {user: lista.user, nomeLista: lista.nomeLista, produtos: itens});
        return response.data.data;
    },

    alterar: async (lista: alter) => {
        const response = await api.post('/alterLista', {lista});
        return response.data.data;
    },

    buscarListas: async (id :number) => {
        const response = await api.post('/getLists', {"user": id});
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
        const response = await api.post('/getProdutos', {busca: busca});
        return response.data.data;
    }
});
