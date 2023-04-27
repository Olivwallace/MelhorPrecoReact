package Service;

import Dao.ListaDAO;
import Model.Lista;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import spark.Request;
import spark.Response;

public class ListService {

    private ListaDAO listaDAO = new ListaDAO();
    private ResponseService response;

    public String createList(Request req, Response resp){
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

    /*
    public String updateList(Request req, Response resp){
        resp.type("application/json");
        Gson gson = new Gson();
        JsonObject json = gson.fromJson(req.body(), JsonObject.class);
    }


    public String getLists(Request req, Response resp){
        resp.type("application/json");
        Gson gson = new Gson();
        JsonObject json = gson.fromJson(req.body(), JsonObject.class);
    }

    public String deleteList(Request req, Response resp){
        resp.type("application/json");
        Gson gson = new Gson();
        JsonObject json = gson.fromJson(req.body(), JsonObject.class);
    }*/

}
