//----------------------- Import Dependencias
import React, { ChangeEvent, FocusEventHandler, useCallback, useEffect, useState } from "react";

//----------------------- Props Input
import { InputProps} from "../../Inputs/PropsInput";
import {produtoBD } from "../PropsList";
import { Autocomplete, TextField } from "@mui/material";

export const InputNomeLista:React.FC<InputProps> = (props) =>{
    return(
        <div className={props.className}>
            <input type="text"
                    id={props.id} 
                    placeholder={props.placeholder} 
                    onChange={props.onChange} 
                    autoComplete="off" 
                   
                    />
        </div>
    );
};
interface Produto {
    id: number;
    nome: string;

  }
  interface itemLista{
    id: number;
    nome: string;
    quantidade: number;
  }
  

  
  export const ListForm:React.FC<produtoBD> = (props) => {
    const [produtos, setProdutos] = useState<itemLista[]>([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto>();
  
    const handleChangeQuantidade = (event: React.ChangeEvent<HTMLInputElement>) => {
      const quantidade = Number(event.target.value);
      if (produtoSelecionado) {
        const produtoAtualizado = { ...produtoSelecionado, quantidade };
        setProdutoSelecionado(produtoAtualizado);
      }
    };
  
    const handleChangeProduto = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const produtoId = Number(event.target.value);
      const produto = props.produto.find((p) => p.id === produtoId);
      setProdutoSelecionado(produto);
    };
    const handleDeleteProduto = (id: number) => {
      const produtosAtualizados = produtos.filter((produto) => produto.id !== id);
      setProdutos(produtosAtualizados);
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!produtoSelecionado) {
        return;
      }
      const quantidadeInput = document.getElementById('quantidade') as HTMLInputElement;
      const quantidade = Number(quantidadeInput.value);
      const produtoA = { ...produtoSelecionado, quantidade };
      if (produtos.some((produto) => produto.id === produtoA.id)) {
        const produtosAtualizados = produtos.map((produto) =>
          produto.id === produtoA.id ? produtoA : produto
        );
        setProdutos(produtosAtualizados);
      } else {
        setProdutos((prevProdutos) => [...prevProdutos, produtoA]);
      }
    };
  
    const ListaProdutos = ({ produtos }: { produtos: itemLista[] }) => {
      return (
        <ul>
          {produtos.map((produto) => (
            <li key={produto.id}>
              {produto.nome} - {produto.quantidade}
              <button onClick={() => handleDeleteProduto(produto.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      );
    };
  
    return (
      <form onSubmit={handleSubmit}>
              <label htmlFor="produto">Produto:</label>
        <select id="produto" onChange={handleChangeProduto}>
          <option value="">Selecione um produto</option>
          {props.produto.map((produto) => (
            <option key={produto.id} value={produto.id}>
              {produto.nome}
            </option>
          ))}
        </select>
        <label htmlFor="quantidade">Quantidade:</label>
        <input type="number" id="quantidade" onChange={handleChangeQuantidade} />
        <button type="submit">Adicionar</button>
        <ListaProdutos produtos={produtos}/>
      </form>
    );
  };

  
  
  
  
  
  
  