export interface propsInfonota{

    onChange?:() =>{}
    label?:() =>{}
    produtos: Produto[];

}
interface Produto {
    abreviacao: string;
    palavras: (string | string[])[];
    valor: string;
  }
 