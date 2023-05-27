import { ProductModel } from "../../../model"

export type create = {
    user:number,
    nomeLista: string,
    produtos: ProductModel[]
}

export type alter = {
	id: number,
	nomeLista: string,
	produtos: ProductModel[]
}

export type search = {
	user: number
}

export type searchStr = {
	busca: string
}

export type excluir = {
	user: string,
	lista: number,
	password: string
}
