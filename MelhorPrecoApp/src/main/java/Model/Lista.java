package Model;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.util.ArrayList;

public class Lista {

    private int userId;
    private int listId;
    private String nomeLista;
    private ArrayList<Produto> itens;

    //------------------------------- Construtores ------------------------------------

    public Lista(JsonObject json){
        setUserId((json.get("user") != null)?json.get("user").getAsInt():0);
        setListId((json.get("id") != null)?json.get("id").getAsInt():0);
        setNomeLista(json.get("nomeLista").toString().replaceAll("\"",""));

        JsonArray itens = json.getAsJsonArray("produtos");
        ArrayList<Produto> produtos = new ArrayList<>();

        for(int i = 0; i < itens.size(); i++){
            produtos.add(new Produto(itens.get(i)));
        }

        setItens(produtos);
    }

    public Lista(int codLista, int userId, String nomeLista, ArrayList<Produto> produtos) {
        setListId(codLista);
        setUserId(userId);
        setNomeLista(nomeLista);
        setItens(produtos);
    }

    //--------------------------------- Setter's --------------------------------------

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setListId(int listId) {
        this.listId = listId;
    }

    public void setNomeLista(String nomeLista) {
        this.nomeLista = nomeLista;
    }

    public void setItens(ArrayList itens) {
        this.itens = itens;
    }

    //--------------------------------- Getter's --------------------------------------

    public int getUserId() {
        return userId;
    }

    public int getListId() {
        return listId;
    }

    public String getNomeLista() {
        return nomeLista;
    }

    public ArrayList<Produto> getItens() {
        return itens;
    }

}
