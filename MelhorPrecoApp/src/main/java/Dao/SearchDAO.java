package Dao;

import Model.Lista;
import java.sql.Connection;
import Connection.Connect;
import Model.Mercado;
import Model.Produto;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.sun.jdi.event.StepEvent;
import netscape.javascript.JSObject;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;

public class SearchDAO {

    public ArrayList<Mercado> getMarketOrderByAvaliacao(JsonObject json){
        ArrayList<Mercado> mercados = new ArrayList<>();

        Connection conexao = Connect.getConnection();
        PreparedStatement statement = null;
        ResultSet resultSet = null;


        try {
            statement = conexao.prepareStatement(
                    "SELECT M.nome AS nomeMercado, M.cnpj, CONCAT(M.rua,', ',M.numero, ', ', M.cep, ' - ', M.cidade, ' - ', M.estado) AS endereco, M.coordenada, P.*, I.valor, I.promocionado, I.validade_promocao " +
                            "FROM mercado AS M JOIN itensMercado AS I ON I.mercado = M.id JOIN produto AS P ON I.produto = P.codigo " +
                            "WHERE M.nome LIKE ? " +
                            "ORDER BY M.avaliacao DESC");

            statement.setString(1, "%" + json.get("text").toString().replaceAll("\"","") + "%");

            resultSet = statement.executeQuery();

            while (resultSet.next()) {
                String cnpj = resultSet.getString("cnpj");
                String nome = resultSet.getString("nomeMercado");
                String endereco = resultSet.getString("endereco");
                String coordenada = resultSet.getString("coordenada");

                ArrayList<Produto> itens = new ArrayList<>();
                while(resultSet.next() && resultSet.getString("cnpj").equals(cnpj)) {
                    String codigo = resultSet.getString("codigo");
                    String nomeItem = resultSet.getString("nome");
                    String marca = resultSet.getString("marca");
                    String unMedida = resultSet.getString("un_medida");
                    int avaliacao = resultSet.getInt("avaliacao");
                    String desc = resultSet.getString("descricao");
                    double valor = resultSet.getDouble("valor");
                    boolean promocionado = resultSet.getBoolean("promocionado");
                    Date data = resultSet.getDate("validade_promocao");

                    itens.add(new Produto(codigo, nomeItem, marca, unMedida, desc, avaliacao, valor, promocionado, data));
                }

                mercados.add(new Mercado(cnpj, nome, endereco, coordenada, itens));
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return mercados;
    }

    public  ArrayList<Produto> getProdutos(JsonObject json){
        ArrayList<Produto> produtos = new ArrayList<>();

        Connection conexao = Connect.getConnection();
        PreparedStatement statement = null;
        ResultSet resultSet = null;

        try {
            statement = conexao.prepareStatement("SELECT * FROM produto WHERE nome ILIKE ? or descricao ILIKE ?");
            statement.setString(1, "%" + json.get("busca").getAsJsonObject().get("busca").toString().toString().replaceAll("\"","") + "%");
            statement.setString(2, "%" + json.get("busca").getAsJsonObject().get("busca").toString().toString().replaceAll("\"","") + "%");

            resultSet = statement.executeQuery();

            while (resultSet.next()) {
                    String codigo = resultSet.getString("codigo");
                    String nomeItem = resultSet.getString("nome");
                    String marca = resultSet.getString("marca");
                    String unMedida = resultSet.getString("un_medida");
                    int avaliacao = resultSet.getInt("avaliacao");
                    String desc = resultSet.getString("descricao");

                    produtos.add(new Produto(codigo, nomeItem, marca, unMedida, desc, (float)avaliacao));
            }

        } catch (SQLException ex) {
             throw new RuntimeException(ex);
        }

        return produtos;
    }

}
