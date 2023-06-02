/**
 * @file Mercado.java
 * @author Jerson Vitor de Paula Gomes
 * @brief Model Produto for Melhor Preço APP
 * @date 18/04/2023
 */

package Model;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.util.ArrayList;

public class Nota {

    private String chaveAcesso;
    private String[] mercado; // foreign key
    private ArrayList<Tmp> produtos;

    // ------------------- Construtores -------------------

    public Nota(JsonObject json) {

        setChaveAcesso((json.get("chaveAcesso") != null)?json.get("chaveAcesso").toString():"");
        JsonArray itens = json.getAsJsonArray("mercado");
        String [] mercado = new String[itens.size()];
        for (int i = 0; i <itens.size() ; i++) {
            mercado[i] = itens.get(i).toString();
        }
        setMercado(mercado);
       itens = json.getAsJsonArray("produtos");
       ArrayList<Tmp> produtos = new ArrayList<>();
        for(int i = 0; i < itens.size(); i++){
            produtos.add(new Tmp(itens.get(i)));
        }
        setProdutos(produtos);

    }

    // ------------------- Setters -------------------

    public void setChaveAcesso(String chaveAcesso) {
        this.chaveAcesso = chaveAcesso;
    }

    public void setMercado(String[] mercado) {
        this.mercado = mercado;
    }
    public void setProdutos(ArrayList<Tmp> produtos) {
        this.produtos = produtos;
    }

    // ------------------- Getters -------------------

    public String getChaveAcesso() {
        return chaveAcesso;
    }

    public String[] getMercado() {
        return mercado;
    }

    public ArrayList<Tmp> getProdutos() {
        return produtos;
    }

}
