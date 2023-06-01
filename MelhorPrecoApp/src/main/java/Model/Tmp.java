package Model;

import java.util.ArrayList;

public class Tmp {

    public String abreviacao;
    public Object[] palavras;
    public String valor;

  public Tmp(String abreviacao,Object[] produtos,String valor){
      this.abreviacao = abreviacao;
      this.palavras = produtos;
      this.valor = valor;
  }
  public Tmp(){
      this.abreviacao = null;
      this.valor = null;
      this.palavras = null;
  }
}
