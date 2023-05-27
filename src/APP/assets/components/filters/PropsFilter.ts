import { ListaDate } from "../../../model/dadosLista";

export interface PropsFilter {
    options?: Array<ListaDate>,
    filters: {select: string, radio: string}
    onChange: Array<any>;
    className?: string;
}