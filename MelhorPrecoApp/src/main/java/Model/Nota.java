/**
 * @file Mercado.java
 * @author Jerson Vitor de Paula Gomes
 * @brief Model Produto for Melhor Preço APP
 * @date 18/04/2023
 */

package Model;

import java.util.ArrayList;

public class Nota {
    private int idNota; // primary key
    private String chaveAcesso;
    private Mercado mercado; // foreign key
    private int avaliaMercado;
    private ArrayList<Integer> avaliaProduto;
    private ArrayList<Produto> produtos;

    // ------------------- Construtores -------------------

    public Nota(int idNota, String chaveAcesso, Mercado mercado, int avaliaMercado, ArrayList<Integer> avaliaProduto,
            ArrayList<Produto> produtos) {
        setIdNota(idNota);
        setChaveAcesso(chaveAcesso);
        setMercado(mercado);
        setAvaliaMercado(avaliaMercado);
        setAvaliaProduto(avaliaProduto);
        setProdutos(produtos);
    }

    // ------------------- Setters -------------------

    public void setIdNota(int idNota) {
        this.idNota = idNota;
    }

    public void setChaveAcesso(String chaveAcesso) {
        this.chaveAcesso = chaveAcesso;
    }

    public void setMercado(Mercado mercado) {
        this.mercado = mercado;
    }

    public void setAvaliaMercado(int avaliaMercado) {
        this.avaliaMercado = avaliaMercado;
    }

    public void setAvaliaProduto(ArrayList<Integer> avaliaProduto) {
        this.avaliaProduto = avaliaProduto;
    }

    public void setProdutos(ArrayList<Produto> produtos) {
        this.produtos = produtos;
    }

    // ------------------- Getters -------------------

    public int getIdNota() {
        return idNota;
    }

    public String getChaveAcesso() {
        return chaveAcesso;
    }

    public Mercado getMercado() {
        return mercado;
    }

    public int getAvaliaMercado() {
        return avaliaMercado;
    }

    public ArrayList<Integer> getAvaliaProduto() {
        return avaliaProduto;
    }

    public ArrayList<Produto> getProdutos() {
        return produtos;
    }

}
