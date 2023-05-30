package Dao;

import Model.Lista;
import java.sql.Connection;
import Connection.Connect;
import Model.Produto;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import netscape.javascript.JSObject;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class ListaDAO {

    /**
     * Cria uma nova lista no banco de dados, juntamente com os seus itens associados.
     * @param lista A lista a ser criada.
     * @return true se a lista foi criada com sucesso, false caso contrário.
     */
    public boolean create(Lista lista){
        Connection connect = Connect.getConnection();
        PreparedStatement s1, s2, s3, s4 = null;
        boolean status = true;

        try {
            // Desativa o commit automático para permitir o controle manual
            connect.setAutoCommit(false);

            // Insere a lista no banco de dados
            s1 = connect.prepareStatement("INSERT INTO lista (nome, usuario, ultima_modificacao) VALUES (?, ?, CURRENT_TIMESTAMP)");
            s1.setString(1, lista.getNomeLista());
            s1.setInt(2, lista.getUserId());
            s1.executeUpdate();

            // Recupera o ID da lista recém-criada
            s2 = connect.prepareStatement("SELECT codigo FROM lista WHERE nome = ? AND usuario = ? ORDER BY ultima_modificacao DESC LIMIT 1");
            s2.setString(1, lista.getNomeLista());
            s2.setInt(2, lista.getUserId());
            ResultSet res = s2.executeQuery();

            if(res.next()) {
                int idLista = res.getInt("codigo");

                // Insere os itens da lista no banco de dados
                s3 = connect.prepareStatement("INSERT INTO itenslista (lista, produto, qtdProduto, ultima_modificacao) VALUES (?, ?, ?, CURRENT_TIMESTAMP)");

                for (Produto p : lista.getItens()) {
                    s3.setInt(1, idLista);
                    s3.setString(2, p.getCodigo());
                    s3.setInt(3, p.getQuantidade());
                    s3.addBatch();
                }

                s3.executeBatch();
            }

            // Realiza o commit das alterações no banco de dados
            connect.commit();
            status = true;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return  status;
    }

    /**
     * Atualiza uma lista existente no banco de dados juntamente com seus itens associados.
     * @param lista A lista a ser atualizada.
     * @return true se a atualização foi bem-sucedida, false caso contrário.
     */
    public boolean update(Lista lista) {
        Connection connect = Connect.getConnection();
        PreparedStatement s1, s2, s3, s4 = null;
        boolean status = true;

        try {
            // Desativa o commit automático para permitir o controle manual
            connect.setAutoCommit(false);

            // Atualiza o nome e a data de modificação da lista
            s1 = connect.prepareStatement("UPDATE lista SET nome = ?, ultima_modificacao = CURRENT_TIMESTAMP WHERE codigo = ?");
            s1.setString(1, lista.getNomeLista());
            s1.setInt(2, lista.getListId());
            s1.executeUpdate();

            // Remove os itens da lista no banco de dados
            s2 = connect.prepareStatement("DELETE FROM itenslista WHERE lista = ?");
            s2.setInt(1, lista.getListId());

            if(s2.executeUpdate() > 0) {
                // Insere novamente os itens atualizados da lista no banco de dados
                s3 = connect.prepareStatement("INSERT INTO itenslista (lista, produto, qtdProduto, ultima_modificacao) VALUES (?, ?, ?, CURRENT_TIMESTAMP)");

                for (Produto p : lista.getItens()) {
                    s3.setInt(1, lista.getListId());
                    s3.setString(2, p.getCodigo());
                    s3.setInt(3, p.getQuantidade());
                    s3.addBatch();
                }

                s3.executeBatch();
            }

            // Realiza o commit das alterações no banco de dados
            connect.commit();
            status = true;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return status;
    }

    /**
     * Obtém o ID da última lista com o nome especificado.
     * @param nome O nome da lista.
     * @return O ID da última lista com o nome especificado, ou -1 se não encontrada.
     */
    public int getLastList(String nome){
        Connection connect = Connect.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;
        int id = -1;

        try {
            statement = connect.prepareStatement("SELECT id FROM lista WHERE nome = ? ORDER BY ultima_modificacao DESC LIMIT 1");
            statement.setString(1, nome);

            result = statement.executeQuery();

            if(result.next()) id = result.getInt("id");

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return id;
    }

    /**
     * Recupera todas as listas associadas a um usuário específico do banco de dados.
     *
     * @param userId O ID do usuário.
     * @return Uma ArrayList contendo objetos Lista que representam as listas do usuário e seus produtos associados.
     * @throws RuntimeException se ocorrer um erro ao executar as instruções SQL ou processar os resultados.
     */
    public ArrayList<Lista> getLists(int userId) {
        Connection connect = Connect.getConnection();  // Obtém a conexão com o banco de dados
        PreparedStatement s1, s2, s3, s4 = null;
        boolean status = true;

        ArrayList<Lista> listas = new ArrayList<>();  // Cria uma lista para armazenar as listas recuperadas

        try {
            connect.setAutoCommit(false);

            // Executa a consulta para recuperar as informações das listas do usuário
            s1 = connect.prepareStatement("SELECT codigo, nome FROM lista WHERE usuario = ?");
            s1.setInt(1, userId);
            ResultSet r1 = s1.executeQuery();

            // Itera sobre os resultados da consulta das listas
            while (r1.next()) {
                int codLista = r1.getInt("codigo");
                String nomeLista = r1.getString("nome");

                // Executa a consulta para recuperar as informações dos produtos associados a cada lista
                s2 = connect.prepareStatement("SELECT codigo, nome, un_medida, qtdproduto FROM produto JOIN itenslista ON codigo = produto WHERE lista = ?");
                s2.setInt(1, codLista);
                ResultSet r2 = s2.executeQuery();

                ArrayList<Produto> produtos = new ArrayList<>();  // Cria uma lista para armazenar os produtos da lista atual
                // Itera sobre os resultados da consulta dos produtos
                while (r2.next()) {
                    String cod = r2.getString("codigo");
                    String nome = r2.getString("nome");
                    String un_medida = r2.getString("un_medida");
                    int qtd = r2.getInt("qtdproduto");

                    produtos.add(new Produto(cod, nome, un_medida, qtd));  // Cria objetos Produto e adiciona à lista de produtos
                }

                // Cria um objeto Lista com as informações da lista atual e seus produtos associados, e adiciona à lista de listas
                listas.add(new Lista(codLista, userId, nomeLista, produtos));
            }

            connect.commit();  // Confirma a transação no banco de dados

        } catch (SQLException e) {
            throw new RuntimeException(e);  // Lança uma exceção caso ocorra um erro durante a execução das instruções SQL
        }

        return listas;  // Retorna a lista de listas do usuário
    }

    /**
     * Exclui uma lista do banco de dados, juntamente com todos os seus itens associados.
     * @param json O objeto JSON contendo as informações necessárias para exclusão da lista.
     * @return true se a exclusão foi bem-sucedida, false caso contrário.
     */
    public boolean deleteList(JsonObject json){
        Connection connect = Connect.getConnection();
        PreparedStatement s1, s2, s3 = null;
        boolean status = true;

        int idLista = json.get("lista").getAsInt();
        int idUser = json.get("user").getAsInt();

        try {
            // Desativa o commit automático para permitir o controle manual
            connect.setAutoCommit(false);

            // Exclui os itens da lista do banco de dados
            s1 = connect.prepareStatement("DELETE FROM itenslista WHERE lista = ?");
            s1.setInt(1, idLista);
            s1.executeUpdate();

            // Exclui a lista do banco de dados
            s2 = connect.prepareStatement("DELETE FROM lista WHERE codigo = ? AND usuario = ?");
            s2.setInt(1, idLista);
            s2.setInt(2, idUser);
            s2.executeUpdate();

            // Realiza o commit das alterações no banco de dados
            connect.commit();
            status = true;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return status;
    }

}
