package Model;

import com.google.gson.*;

import java.util.Random;

public class LoginData {

    //--------------------------------- Atribultos ----------------------------------------//

    private String email;       //Data User Login
    private String password;
    private String token;

    //------------------------------- Construtores --------------------------------------

    public LoginData(String email, String password, String token){
        setEmail(email);
        setPassword(password);
        setToken(token);
    }

    public LoginData(String email){
        setEmail(email);
    }

    public LoginData(String email, String token){
        setEmail(email);
        setToken(token);
    }

    public LoginData(JsonObject loginData){
        this(loginData.get("email").getAsString().toString().replace("\"",""),
             loginData.get("password").getAsString().toString().replace("\"",""),
            gerarToken());
    }


    //--------------------------------- Setter's ----------------------------------------

    public void setEmail(String email){
        this.email = email;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public void setToken(String token){
        this.token = token;
    }

    //--------------------------------- Getter's --------------------------------------

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getToken() {
        return token;
    }

    //---------------------------------- Metodos -------------------------------------

    public static String gerarToken(){
        String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        int LENGTH = 20;

        Random random = new Random();
        StringBuilder sb = new StringBuilder(LENGTH);

        for (int i = 0; i < LENGTH; i++) {
            int index = random.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(index));
        }

        return sb.toString();
    }
}
