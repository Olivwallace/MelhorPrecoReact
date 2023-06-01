export type Infonota = {
    chaveAcesso: string;
    mercado:string[];
    produtos: Produto[];

}
type Produto = {
    abreviacao: string;
    palavras: (string | string[])[];
    avaliacao: number;
    valor: string;
  }
 
export type uploadNota = {
    image: FormData
}