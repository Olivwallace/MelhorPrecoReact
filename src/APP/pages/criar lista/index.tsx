import React from 'react';
import './CLista.css';

import createLista from './img/createList.svg'
import {InputNomeLista } from '../../assets/components';



export const CreateLista : React.FC = (props) => {

    return(
        <main className='main'>
            <div className='div1'> 
                
            </div>
       <div className='div2'>
       
  
        </div>
        <div className='div3'>
        <img className='img' src={createLista} alt="" />
       
        </div>
       </main>
        
    );
}