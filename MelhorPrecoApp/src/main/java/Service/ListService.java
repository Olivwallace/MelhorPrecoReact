package Service;

import Dao.ListaDAO;
import Model.Lista;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import spark.Request;
import spark.Response;

import java.util.ArrayList;

public class ListService {

    private ListaDAO listaDAO = new ListaDAO();
    private ResponseService response;

    public String createList(Request req, Response resp) {
        resp.type("application/json");
        Gson gson = new Gson();
        JsonObject json = gson.fromJson(req.body(), JsonObject.class);

        Lista lista = new Lista(json);
        boolean create = listaDAO.create(lista);

        JsonObject data = new JsonObject();
        if (create) {
            data.addProperty("Criada", true);
            response = new ResponseService(200, "SUCESS", data);
        } else {
            data.addProperty("Criada", false);
            response = new ResponseService(409, "ERROR", data);
        }

        return response.toJson();
    }

    public String updateList(Request req, Response resp){
        resp.type("application/json");
        Gson gson = new Gson();
        JsonObject json = gson.fromJson(req.body(), JsonObject.class);

        Lista lista = new Lista(json);
        boolean create = listaDAO.update(lista);

        JsonObject data = new JsonObject();
        if (create) {
            data.addProperty("Alterada", true);
            response = new ResponseService(200, "SUCESS", data);
        } else {
            data.addProperty("Alterada", false);
            response = new ResponseService(409, "ERROR", data);
        }

        return response.toJson();
    }

    public String getLists(Request req, Response resp){
        resp.type("application/json");
        Gson gson = new Gson();
        JsonObject json = gson.fromJson(req.body(), JsonObject.class);

        ArrayList<Lista> listas = listaDAO.getLists(json.get("user").getAsInt());

        JsonObject data = new JsonObject();
        JsonArray arrayList = new JsonArray();

        if (listas.size() > 0) {
            for (Lista l : listas){
                arrayList.add(gson.toJsonTree(l));
            }

            data.add("listas", arrayList);
            response = new ResponseService(200, "SUCESS", data);
        } else {
            data.add("listas", arrayList);
            response = new ResponseService(409, "ERROR", data);
        }

        return response.toJson();

    }

    public String deleteList(Request req, Response resp){
        resp.type("application/json");
        Gson gson = new Gson();
        JsonObject json = gson.fromJson(req.body(), JsonObject.class);

        boolean deleteList = listaDAO.deleteList(json);

        JsonObject data = new JsonObject();
        if (deleteList) {
            data.addProperty("Excluida", true);
            response = new ResponseService(200, "SUCESS", data);
        } else {
            data.addProperty("Excluida", false);
            response = new ResponseService(409, "ERROR", data);
        }

        return response.toJson();
    }

}
