/**
 * @file Service.java
 * @author Wallace Freitas Oliveira (https://github.com/Olivwallace)
 * @brief Service Register For Api
 * @date 22-04-2023
 */

package Service;

import Dao.UserDAO;
import Model.User;
import com.google.gson.*;
import spark.Request;
import spark.Response;

public class RegisterService {

    private final UserDAO userDAO = new UserDAO();
    private ResponseService response;

    public String existEmail(Request req, Response resp) {
        resp.type("application/json");
        Gson gson = new Gson();
        JsonObject json = gson.fromJson(req.body(), JsonObject.class);

        boolean exist = userDAO.existEmail(json.get("email").toString().replace("\"",""));

        JsonObject data = new JsonObject();
        if (exist) {
            data.addProperty("exist", true);
            response = new ResponseService(409, "CONFLICT", data);
        } else {
            data.addProperty("exist", false);
            response = new ResponseService(200, "DISPONIBLE", data);
        }

        return response.toJson();
    }

    public String existUser(Request req, Response resp) {
        resp.type("application/json");
        Gson gson = new Gson();
        JsonObject json = gson.fromJson(req.body(), JsonObject.class);
        System.out.println(json);

        boolean exist = userDAO.existCPF(json.get("CPF").toString().replace("\"",""));

        JsonObject data = new JsonObject();
        if (exist) {
            data.addProperty("exist", true);
            response = new ResponseService(409, "CONFLICT", data);
        } else {
            data.addProperty("exist", false);
            response = new ResponseService(200, "DISPONIBLE", data);
        }

        return response.toJson();
    }

    public String registerUser(Request req, Response resp){
        resp.type("application/json");
        Gson gson = new Gson();
        JsonObject json = gson.fromJson(req.body(), JsonObject.class);

        JsonObject jsonUser = json.get("user").getAsJsonObject();
        JsonObject jsonLoginData = json.getAsJsonObject("loginData").getAsJsonObject();

        User newUser = new User(jsonUser, jsonLoginData);

        boolean register = userDAO.registerUser(newUser);

        JsonObject data = new JsonObject();
        JsonObject user = new JsonObject();
        if(register) {
            user.addProperty("email", newUser.getDadosLogin().getEmail());
            user.addProperty("nome", newUser.getNome() + " " + newUser.getSobrenome());

            data.addProperty("register", true);
            data.add("user", user);

            response = new ResponseService(200, "SUCESS", data);
        }else{
            data.addProperty("register", false);
            data.add("user", user);

            response = new ResponseService(401, "REGISTER ERROR", data);
        }

        return response.toJson();
    }

    public String updateUser(Request req, Response resp) {
        resp.type("application/json");
        Gson gson = new Gson();
        JsonObject json = gson.fromJson(req.body(), JsonObject.class);

        JsonObject jsonUser = json.get("user").getAsJsonObject();
        JsonObject jsonLoginData = json.getAsJsonObject("loginData").getAsJsonObject();

        User newUser = new User(jsonUser, jsonLoginData);

        boolean update = userDAO.updateUser(newUser);

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

    public String updatePassword(Request req, Response resp){
        resp.type("application/json");
        Gson gson = new Gson();
        JsonObject json = gson.fromJson(req.body(), JsonObject.class);

        boolean update = userDAO.updatePassword(json);

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
