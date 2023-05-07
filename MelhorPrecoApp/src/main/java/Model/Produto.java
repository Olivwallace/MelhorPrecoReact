/**
 * @file Mercado.java
 * @author Jerson Vitor de Paula Gomes
 * @brief Model Produto for Melhor Preço APP
 * @date 18/04/2023
 */

package Model;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class Produto {

    private String codigo;
    private String nome;
    private String marca;
    private String unidadeMedida;
    private String descricao;
    private int quantidade;
    private float avaliacaoMedia;
    private int numAvaliacoes;

    // ------------------- Construtores -------------------

    public Produto(String codigo, String nome, String marca, String unidadeMedida, String descricao) {
        setCodigo(codigo);
        setNome(nome);
        setMarca(marca);
        setUnidadeMedida(unidadeMedida);
        setDescricao(descricao);
    }

    public Produto(JsonElement json){
        String codigo = json.getAsJsonObject().get("codigo").toString().replaceAll("\"", "");
        int quantidade = json.getAsJsonObject().get("quantidade").getAsInt();
        setCodigo(codigo);
        setQuantidade(quantidade);
    }

    public Produto(String cod, String nome, String marca, String un_medida, String descricao, int qtd) {
        setCodigo(cod);
        setNome(nome);
        setMarca(marca);
        setUnidadeMedida(un_medida);
        setDescricao(descricao);
        setQuantidade(qtd);
    }

    // ------------------- Setters -------------------

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public void setUnidadeMedida(String unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setAvaliacaoMedia(float avaliacaoMedia) {
        this.avaliacaoMedia = avaliacaoMedia;
    }

    public void setNumAvaliacoes(int numAvaliacoes) {
        this.numAvaliacoes = numAvaliacoes;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    // ------------------- Getters -------------------

    public String getCodigo() {
        return codigo;
    }

    public String getNome() {
        return nome;
    }

    public String getMarca() {
        return marca;
    }

    public String getUnidadeMedida() {
        return unidadeMedida;
    }

    public String getDescricao() {
        return descricao;
    }

    public float getAvaliacaoMedia() {
        return avaliacaoMedia;
    }

    public int getNumAvaliacoes() {
        return numAvaliacoes;
    }

    public int getQuantidade() {
        return quantidade;
    }
}
