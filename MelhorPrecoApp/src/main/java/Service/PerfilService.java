package Service;


import Dao.UserDAO;
import Model.User;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import spark.Request;
import spark.Response;

public class PerfilService {

    private UserDAO userDAO = new UserDAO();
    private ResponseService response;

    public String setPontos(Request req, Response resp){
        resp.type("application/json");
        Gson gson = new Gson();
        JsonObject json = gson.fromJson(req.body(), JsonObject.class);

        boolean update = userDAO.setPontos(json.get("user").getAsJsonObject());

        JsonObject data = new JsonObject();
        if (update) {
            data.addProperty("changed", true);
            response = new ResponseService(200, "Successfully Changed", data);
        } else {
            data.addProperty("changed", false);
            response = new ResponseService(409, "Error Changed", data);
        }

        return response.toJson();
    }

    public String getUser(Request req, Response resp){
        resp.type("application/json");
        Gson gson = new Gson();
        JsonObject json = gson.fromJson(req.body(), JsonObject.class);

        User usuario = userDAO.getUser(json.get("user").getAsJsonObject().get("id").getAsInt());

        JsonObject data = new JsonObject();
        if(usuario != null) {
            JsonObject user = new JsonObject();

            user.addProperty("id", usuario.getId());
            user.addProperty("nome", usuario.getNome());
            user.addProperty("sobrenome", usuario.getSobrenome());
            user.addProperty("datanascimento", String.valueOf(usuario.getNascimento()));
            user.addProperty("genero", usuario.getGenero());
            user.addProperty("CPF", usuario.getCPF());
            user.addProperty("pontos", usuario.getPontos());
            user.addProperty("email", usuario.getDadosLogin().getEmail());

            data.add("user", user);

            response = new ResponseService(200, "SUCESS", data);
        }else{
            response = new ResponseService(400, "USUARIO NÃO ENCONTRADO", data);
        }

        return response.toJson();
    }

    public String deleteUser(Request req, Response resp){
        resp.type("application/json");
        Gson gson = new Gson();
        JsonObject json = gson.fromJson(req.body(), JsonObject.class);

        boolean update = userDAO.deleteUser(json);

        JsonObject data = new JsonObject();
        if (update) {
            data.addProperty("changed", true);
            response = new ResponseService(200, "Successfully Changed", data);
        } else {
            data.addProperty("changed", false);
            response = new ResponseService(409, "Error Changed", data);
        }

        return response.toJson();
    }

}
