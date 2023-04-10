
export interface InputProps {
    autoComplete?:boolean;
    forText?:string;
    className?:string;
    id?:string;
    src?:string;
    name?:string;
    value:string;
    type?:string;
    onChange?:any;
    placeholder?:string;
}

export interface InputPropsArray{
    autoComplete?:boolean;
    forText?:Array<string>;
    className?:string;
    id?:Array<string>;
    src?:Array<string>;
    name?:Array<string>;
    value:Array<string>;
    type?:Array<string>;
    onChange?:Array<any>;
    placeholder?:Array<string>;
}
