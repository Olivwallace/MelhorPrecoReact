export type create = {
    user:number,
    nomeLista: string,
    produtos:[
        {
            codigo: string,
            quantidade: number, 
        }
]
}

export type alter = {
	id: number,
	nomeLista: string,
	produtos: [
		{
            codigo: string,
            quantidade: number, 
        }
]
}

export type search = {

	user: number
}

export type excluir = {

	user: string,
	lista: number,
	password: string

}
