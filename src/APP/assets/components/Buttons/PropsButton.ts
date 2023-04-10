//Define Propiedades de um Botão
export interface ButtonProps {
    content?: string;
    class?: string;
    disebled?:boolean;
    sizeIcon?:number;
    icon?:JSX.Element;
    onClick?: any;
    href?:string;
    left?:boolean;
    right?:boolean;
}