package Service;

import Dao.SearchDAO;
import Model.Mercado;
import Model.Produto;
import Model.User;
import com.google.gson.*;
import spark.Request;
import spark.Response;

import java.util.ArrayList;

public class SearchService {

    private final SearchDAO searchDAO = new SearchDAO();
    private ResponseService response;

    public String getMercados (Request req, Response resp) {
        resp.type("application/json");
        Gson gson = new Gson();
        JsonObject json = gson.fromJson(req.body(), JsonObject.class);

        ArrayList<Mercado> resposta = searchDAO.getMarketOrderByAvaliacao(json);

        JsonObject data = new JsonObject();
        if (resposta.size() > 0) {
            JsonArray markets = new JsonArray();

            for (Mercado x : resposta) {
                JsonObject mercado = new JsonObject();
                mercado.addProperty("nome", x.getNome());
                mercado.addProperty("cnpj", x.getCNPJ());
                mercado.addProperty("endereco", x.getEndereco());

                JsonArray coords = new JsonArray();
                for (String coord : x.getCoordenada()) {
                    coords.add(coord);
                }
                mercado.add("coords", coords);

                JsonArray produtos = new JsonArray();
                for (Produto produto : x.getItens()) {
                    JsonObject jsonProduto = new JsonObject();
                    jsonProduto.addProperty("codigo", produto.getCodigo());
                    jsonProduto.addProperty("nome", produto.getNome());
                    jsonProduto.addProperty("unMedida", produto.getUnidadeMedida());
                    jsonProduto.addProperty("avaliacao", produto.getAvaliacaoMedia());
                    jsonProduto.addProperty("valor", produto.getValor());

                    produtos.add(jsonProduto);
                }

                mercado.add("produtos", produtos);
                markets.add(mercado);
            }

            data.add("markets", markets);


        response = new ResponseService(200, "Successfully", data);
        } else {
            data.addProperty("markets", "[]");
            response = new ResponseService(409, "Error", data);
        }

        return response.toJson();
    }

    public String getProdutos (Request req, Response resp){
        resp.type("application/json");
        Gson gson = new Gson();
        JsonObject json = gson.fromJson(req.body(), JsonObject.class);

        ArrayList<Produto> resposta = searchDAO.getProdutos(json);

        JsonObject data = new JsonObject();
        if (resposta.size() > 0) {
            JsonArray produtos = new JsonArray();
            for (Produto produto : resposta) {
                JsonObject jsonProduto = new JsonObject();
                jsonProduto.addProperty("codigo", produto.getCodigo());
                jsonProduto.addProperty("nome", produto.getNome());
                jsonProduto.addProperty("unMedida", produto.getUnidadeMedida());
                jsonProduto.addProperty("avaliacao", produto.getAvaliacaoMedia());
                jsonProduto.addProperty("valor", produto.getValor());

                produtos.add(jsonProduto);
            }
            data.add("produtos", produtos);
            response = new ResponseService(200, "Successfully", data);
        } else {
            data.addProperty("produtos", "[]");
            response = new ResponseService(409, "Error", data);
        }

        return response.toJson();
    }


}
