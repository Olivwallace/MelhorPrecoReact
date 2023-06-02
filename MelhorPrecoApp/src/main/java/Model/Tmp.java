package Model;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;

import java.util.ArrayList;

public class Tmp {

    public String abreviacao;
    public Object[] palavras;
     public String produto;
    public String unMedida;
    public String valor;

  public Tmp(String abreviacao,Object[] produtos,String unMedida,String valor){
      this.abreviacao = abreviacao;
      this.palavras = produtos;
      this.unMedida = unMedida;
      this.valor = valor;
      this.produto = null;
  }
  public Tmp(){
      this.produto = null;
      this.abreviacao = null;
      this.valor = null;
      this.palavras = null;
  }

    public Tmp(JsonElement jsonElement) {
      String abreviacao = jsonElement.getAsJsonObject().get("abreviacao").toString();
        JsonArray palavras = jsonElement.getAsJsonObject().getAsJsonArray("palavras");
        Object[] palavrasProcessadas = new Object[palavras.size()];

        for (int i = 0; i < palavras.size(); i++) {
            JsonElement elemento = palavras.get(i);
            if (elemento.isJsonPrimitive()) {
                String palavra = elemento.getAsString();
                palavrasProcessadas[i] = palavra;
            } else if (elemento.isJsonArray()) {
                JsonArray subPalavras = elemento.getAsJsonArray();
                palavrasProcessadas[i] = subPalavras;
            } else {
                palavrasProcessadas[i] = null; // ou outro valor de sua preferência
            }
        }
        String produto = jsonElement.getAsJsonObject().get("palavra").toString();
        String unMedida = jsonElement.getAsJsonObject().get("unMedida").toString();
        String valor = jsonElement.getAsJsonObject().get("valor").toString();
        this.abreviacao = abreviacao;
        this.produto = produto;
        this.palavras = palavrasProcessadas;
        this.unMedida = unMedida;
        this.valor = valor;
    }
}

