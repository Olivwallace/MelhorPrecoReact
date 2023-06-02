export interface propsInfonota{
    onChange?:() =>{}
    onChangeRating?:() =>{}
    produtos: Produto[];

}
interface Produto {
    abreviacao: string;
    palavras: (string | string[])[];
    valor: string;
  }
 