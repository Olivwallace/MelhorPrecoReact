export type ProductModel = {
    codigo: string,
    nome: string,
    marca: string,
    descricao: string,
    unMedida: string,
    valor?: number,
    avaliacao: number,
    promocionado?: boolean
    validadeOferta?: string
}