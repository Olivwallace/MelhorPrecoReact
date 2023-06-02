export type Infonota = {
    chaveAcesso: string;
    mercado:string[];
    produtos: Produto[];


}
type Produto = {
    abreviacao: string;
    palavras: (string | string[])[];
    unMedida:string;
    palavra: string;
    valor: string;
  }
 
export type uploadNota = {
    image: FormData
}