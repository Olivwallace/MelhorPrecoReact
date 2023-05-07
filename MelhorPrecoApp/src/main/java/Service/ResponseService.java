/**
 * @file Service.java
 * @author Wallace Freitas Oliveira (https://github.com/Olivwallace)
 * @brief Service Response Builder
 * @date 22-04-2023
 */

package Service;
import com.google.gson.*;

public class ResponseService {

    private int status;
    private String mensagem;
    private JsonObject data;

    public ResponseService(int status, String mensagem) {
        setStatus(status);
        setMensagem(mensagem);
        setData(null);
    }

    public ResponseService(int status, String mensagem, JsonObject data) {
        setStatus(status);
        setMensagem(mensagem);
        setData(data);
    }

    public String toJson(){
        Gson gson = new Gson();
        JsonObject json = new JsonObject();

        json.addProperty("status", getStatus());
        json.addProperty("mensagem", getMensagem());
        json.add("data", getData());

        return gson.toJson(json);
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public void setData(JsonObject data) {
        this.data = data;
    }

    public int getStatus() {
        return this.status;
    }

    public String getMensagem() {
        return this.mensagem;
    }

    public JsonObject getData() {
        return this.data;
    }

}

