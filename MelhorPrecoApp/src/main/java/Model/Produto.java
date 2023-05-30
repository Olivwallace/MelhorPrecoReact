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

import java.util.Date;

public class Produto {

    private String codigo;
    private String nome;
    private String unidadeMedida;
    private int quantidade;
    private  double valor;
    private float avaliacaoMedia;
    private int numAvaliacoes;

    // ------------------- Construtores -------------------

    public Produto(String codigo, String nome, String unidadeMedida) {
        setCodigo(codigo);
        setNome(nome);
        setUnidadeMedida(unidadeMedida);
    }

    public Produto(JsonElement json){
        String codigo = json.getAsJsonObject().get("codigo").toString().replaceAll("\"", "");
        int quantidade = json.getAsJsonObject().get("quantidade").getAsInt();
        setCodigo(codigo);
        setQuantidade(quantidade);
    }

    public Produto(String cod, String nome, String un_medida, int qtd) {
        setCodigo(cod);
        setNome(nome);
        setUnidadeMedida(un_medida);
        setQuantidade(qtd);
    }

    public Produto(String cod, String nome, String un_medida, float avaliacaoMedia) {
        setCodigo(cod);
        setNome(nome);
        setUnidadeMedida(un_medida);
        setAvaliacaoMedia(avaliacaoMedia);
    }

    public Produto(String codigo, String nomeItem, String unidadeMedida, int avaliacaoMedia,
                   double valor){
        setCodigo(codigo);
        setNome(nomeItem);
        setUnidadeMedida(unidadeMedida);
        setAvaliacaoMedia(avaliacaoMedia);
        setValor(valor);
    }

    // ------------------- Setters -------------------

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setUnidadeMedida(String unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
    }

    public void setAvaliacaoMedia(float avaliacaoMedia) {
        this.avaliacaoMedia = avaliacaoMedia;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    // ------------------- Getters -------------------

    public String getCodigo() {
        return codigo;
    }

    public String getNome() {
        return nome;
    }

    public String getUnidadeMedida() {
        return unidadeMedida;
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

    public double getValor() {
        return valor;
    }
}
