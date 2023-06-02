import * as React from 'react';
import { propsInfonota } from "./propsNota";
import { Rating } from "@mui/material";
import "./nota.css";
type SelectEvent = React.ChangeEvent<HTMLSelectElement>

export const InputNota: React.FC<propsInfonota> = (props) =>  {
 

    return (<>
        <div className='inputNota'>
        {props.produtos.map((produto, index) => (
          
          <div className='divProduto' key={index}>
            
            <div className='produtoFrase'>
              {produto.palavras.map((palavra, palavraIndex) => (
                <div className='produtoPalavra' key={palavraIndex}>
                  {typeof palavra === 'string' ? (
                    <label>{palavra}</label>             
                  ) : (
                   <div className='selectProduto'> 
                    <select >
                      {palavra.map((opcao, opcaoIndex) => (
                        <option key={opcaoIndex} value={opcao}>
                          {opcao}
                        </option>
                      ))}
                    </select>
                 </div>
                  )}
                </div>
              ))}
            </div>
          
            <p className='valorLine'>R$ {produto.valor}</p>
          </div>
        ))}
      </div></>
    );
}


