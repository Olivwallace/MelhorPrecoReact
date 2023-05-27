/**
 * @file Mercado.java
 * @author Jerson Vitor de Paula Gomes
 * @brief Model Mercado for Melhor Preço APP
 * @date 18/04/2023
 */

package Model;

import netscape.javascript.JSObject;

import java.util.ArrayList;

public class Mercado {

    private int id; // primary key
    private String CNPJ;
    private String nome;
    private String rua;
    private int numero;
    private String CEP;
    private String cidade;
    private String estado;
    private String coordenada;
    private float avaliacaoMedia;
    private int numAvaliacoes;
    private ArrayList<Produto> itens;

    // ------------------- Construtores -------------------

    public Mercado(int id, String CNPJ, String nome, String rua, int numero, String CEP, String cidade, String estado,
            String coordenada) {
        setId(id);
        setCNPJ(CNPJ);
        setNome(nome);
        setRua(rua);
        setNumero(numero);
        setCEP(CEP);
        setCidade(cidade);
        setEstado(estado);
        setCoordenada(coordenada);
        setAvaliacaoMedia(3);
        setNumAvaliacoes(0);
    }

    public Mercado(String CNPJ, String nome, String endereco, String coordenada, ArrayList<Produto> itens){
        setCNPJ(CNPJ);
        setNome(nome);
        setRua(endereco);
        setCoordenada(coordenada);
        setItens(itens);
    }

    // ------------------- Setters -------------------

    public void setId(int id) {
        this.id = id;
    }

    public void setCNPJ(String CNPJ) {
        this.CNPJ = CNPJ;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public void setCEP(String CEP) {
        this.CEP = CEP;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public void setCoordenada(String coordenada) {
        this.coordenada = coordenada;
    }

    public void setAvaliacaoMedia(float avaliacaoMedia) {
        this.avaliacaoMedia = avaliacaoMedia;
    }

    public void setNumAvaliacoes(int numAvaliacoes) {
        this.numAvaliacoes = numAvaliacoes;
    }

    public void setItens(ArrayList<Produto> itens){
        this.itens = itens;
    }

    // ------------------- Getters -------------------

    public int getId() {
        return id;
    }

    public String getCNPJ() {
        return CNPJ;
    }

    public String getNome() {
        return nome;
    }

    public String getRua() {
        return rua;
    }

    public int getNumero() {
        return numero;
    }

    public String getCEP() {
        return CEP;
    }

    public String getCidade() {
        return cidade;
    }

    public String getEstado() {
        return estado;
    }

    public String[] getCoordenada() {
        return  coordenada.split(",");
    }

    public float getAvaliacaoMedia() {
        return avaliacaoMedia;
    }

    public int getNumAvaliacoes() {
        return numAvaliacoes;
    }

    public ArrayList<Produto> getItens(){
        return this.itens;
    }
}