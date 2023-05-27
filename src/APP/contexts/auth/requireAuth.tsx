import { useContext } from "react";
import { Login } from "../../pages";
import { AuthContext } from "./authContext";

type Element = JSX.Element;

export const RequireAuth = ({children}:{children:Element}) =>{
    let page:Element = children;   
    
    const context = useContext(AuthContext);
    
    context.validToken();

    if(context.user == null && context.session()){
        context.user = context.usuario();
    }

    if(!context.user){
        page = <Login/>;
    }

    return page;
}