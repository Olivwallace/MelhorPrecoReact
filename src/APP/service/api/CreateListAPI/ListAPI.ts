import { AxiosInstance } from "axios";
import { RegisterData } from "../../../model";
import { alter, create, excluir, search, } from "./Types";

export const ListaAPI = (api: AxiosInstance) => ({

    criar: async (lista: create) => {
        return {
            status:200,
            message:"DISPONIVEL",
            data:{
                Criada: true
            }
        }
        const response = await api.post('/createLista', {lista});
    },

    alterar: async (lista: alter) => {
        return {
            status:200,
            message:"DISPONIVEL",
            data:{
                alterada: true
            }
        }
        const response = await api.post('/alterLista', {lista});
    },
     
    pesquisar: async (lista: search) => {
        return {
            status: 200,
            menssagem: "SUCESS",
            data: {
                listas: [
                    {
                        userId: 3,
                        listId: 8,
                        nomeLista: "Compra A",
                        itens: [
                            {
                                codigo: "81146257298821",
                                nome: "Produto A",
                                marca: "Marca A",
                                unidadeMedida: "100KG ",
                                descricao: "Descrição do Produto A",
                                quantidade: 3,
                                avaliacaoMedia: 0.0,
                                numAvaliacoes: 0
                            },
                            {
                                codigo: "51414613469568",
                                nome: "Produto D",
                                marca: "Marca D",
                                unidadeMedida: "400KG ",
                                descricao: "Descrição do Produto D",
                                quantidade: 4,
                                avaliacaoMedia: 0.0,
                                numAvaliacoes: 0
                            }
                        ]
                    },
                    {
                        userId: 3,
                        listId: 9,
                        nomeLista: "Compra C",
                        itens: [
                            {
                                codigo: "81146257298821",
                                nome: "Produto A",
                                marca: "Marca A",
                                unidadeMedida: "100KG ",
                                descricao: "Descrição do Produto A",
                                quantidade: 3,
                                avaliacaoMedia: 0.0,
                                numAvaliacoes: 0
                            }
                        ]
                    }
                ]
            }
        }
        const response = await api.post('/searchLista', {lista});
    },
    excluir: async (lista: excluir) => {
        return {
            status:200,
            message:"DISPONIVEL",
            data:{
                excluida: true
            }
        }
        const response = await api.post('/createLista', {lista});
    }
   
});
