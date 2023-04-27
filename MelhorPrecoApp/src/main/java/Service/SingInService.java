/**
 * @file Service.java
 * @author Wallace Freitas Oliveira (https://github.com/Olivwallace)
 * @brief Service SingIn For Api
 * @date 22-04-2023
 */

package Service;
import Dao.UserDAO;
import Model.LoginData;
import Model.User;
import com.google.gson.*;
import spark.Request;
import spark.Response;

public class SingInService {

    private UserDAO userDAO = new UserDAO();
    private ResponseService response;

    public String singInUser(Request req, Response resp){

        resp.type("application/json");
        Gson gson = new Gson();
        LoginData loginData = gson.fromJson(req.body(), LoginData.class);

        User userRecuperado = userDAO.singIn(loginData);

        JsonObject data = new JsonObject();
        if(userRecuperado != null) {
            JsonObject user = new JsonObject();

            user.addProperty("id", userRecuperado.getId());
            user.addProperty("nome", userRecuperado.getNome());
            user.addProperty("email", userRecuperado.getDadosLogin().getEmail());

            data.add("user", user);
            data.addProperty("token", userRecuperado.getDadosLogin().getToken());

            response = new ResponseService(200, "SUCESS", data);
        }else{
            response = new ResponseService(400, "LOGIN NÃO ENCONTRADO", data);
        }

        return response.toJson();
    }

    public String validateToken(Request req, Response resp){
        resp.type("application/json");
        Gson gson = new Gson();
        JsonObject json = gson.fromJson(req.body(), JsonObject.class);

        User userRecuperado = userDAO.validateToken(json.get("token").toString().replace("\"",""));

        JsonObject data = new JsonObject();
        if(userRecuperado != null) {

            data.addProperty("id", userRecuperado.getId());
            data.addProperty("nome", userRecuperado.getNome());
            data.addProperty("email", userRecuperado.getDadosLogin().getEmail());

            response = new ResponseService(200, "SUCESS", data);
        }else{
            response = new ResponseService(401, "TOKEN INVALIDO", data);
        }

        return response.toJson();
    }

    public String logout(Request req, Response resp){
        resp.type("application/json");
        Gson gson = new Gson();
        JsonObject json = gson.fromJson(req.body(), JsonObject.class);

        boolean logout = userDAO.logout(json.get("user").getAsJsonObject().get("id").getAsInt());

        JsonObject data = new JsonObject();
        if(logout){
            data.addProperty("logout", true);
            response = new ResponseService(200, "SUCESS", data);
        }else{
            data.addProperty("logout", false);
            response = new ResponseService(401, "Logout Error", data);
        }

        return response.toJson();
    }

}
