import React, { useEffect, useState } from "react";
import { propsInfonota } from "./propsNota";
import { Rating } from "@mui/material";
const [itens, setItens] = useState<React.ReactNode[]>([])

export const inputNota: React.FC<propsInfonota> = (props) => {

    useEffect(() => {
        const inputProdutos = props.produtos.map((element, index) => {
        return(
            
            <div style={{display: "flex",justifyContent:"space-between"}}>
                <label >{element}</label>
                <Rating
                    name="simple-controlled"
                    value={3}
                    onChange={props.onChange}
                    />
            </div>
            
        );


        });
        setItens(inputProdutos);

    }, [props.produtos,props.onChange]);
    return (
        <>{itens}</>
    );
}


