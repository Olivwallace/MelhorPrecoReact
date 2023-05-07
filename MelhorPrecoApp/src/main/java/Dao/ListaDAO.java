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

    public boolean create(Lista lista){
        Connection connect = Connect.getConnection();
        PreparedStatement s1, s2, s3, s4 = null;
        boolean status = true;

        try {

            connect.setAutoCommit(false);

            s1 = connect.prepareStatement("INSERT INTO lista (nome, usuario, ultima_modificacao) VALUES (?, ?, CURRENT_TIMESTAMP)");
            s1.setString(1, lista.getNomeLista());
            s1.setInt(2, lista.getUserId());
            s1.executeUpdate();

            s2 = connect.prepareStatement("SELECT codigo FROM lista WHERE nome = ? AND usuario = ? ORDER BY ultima_modificacao DESC LIMIT 1");
            s2.setString(1, lista.getNomeLista());
            s2.setInt(2, lista.getUserId());
            ResultSet res = s2.executeQuery();

            if(res.next()) {
                int idLista = res.getInt("codigo");

                s3 = connect.prepareStatement("INSERT INTO itenslista (lista, produto, qtdProduto, ultima_modificacao) VALUES (?, ?, ?, CURRENT_TIMESTAMP)");

                for (Produto p : lista.getItens()) {
                    s3.setInt(1, idLista);
                    s3.setString(2, p.getCodigo());
                    s3.setInt(3, p.getQuantidade());
                    s3.addBatch();
                }

                s3.executeBatch();
            }

            connect.commit();
            status = true;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return  status;
    }

    public boolean update(Lista lista) {
        Connection connect = Connect.getConnection();
        PreparedStatement s1, s2, s3, s4 = null;
        boolean status = true;

        try {
            connect.setAutoCommit(false);

            s1 = connect.prepareStatement("UPDATE lista SET nome = ?, ultima_modificacao = CURRENT_TIMESTAMP WHERE codigo = ?");
            s1.setString(1, lista.getNomeLista());
            s1.setInt(2, lista.getListId());
            s1.executeUpdate();

            s2 = connect.prepareStatement("DELETE FROM itenslista WHERE lista = ?");
            s2.setInt(1, lista.getListId());

            if(s2.executeUpdate() > 0) {
                s3 = connect.prepareStatement("INSERT INTO itenslista (lista, produto, qtdProduto, ultima_modificacao) VALUES (?, ?, ?, CURRENT_TIMESTAMP)");

                for (Produto p : lista.getItens()) {
                    s3.setInt(1, lista.getListId());
                    s3.setString(2, p.getCodigo());
                    s3.setInt(3, p.getQuantidade());
                    s3.addBatch();
                }

                s3.executeBatch();
            }

            connect.commit();
            status = true;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return  status;
    }

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

        return  id;
    }

    public ArrayList<Lista> getLists(int userId){
        Connection connect = Connect.getConnection();
        PreparedStatement s1, s2, s3, s4 = null;
        boolean status = true;

        ArrayList<Lista> listas = new ArrayList<>();

        try {
            connect.setAutoCommit(false);

            s1 = connect.prepareStatement("SELECT codigo, nome FROM lista WHERE usuario = ?");
            s1.setInt(1, userId);
            ResultSet r1 = s1.executeQuery();

            while(r1.next()){

                int codLista = r1.getInt("codigo");
                String nomeLista = r1.getString("nome");

                s2 = connect
                    .prepareStatement("SELECT codigo, nome, marca, un_medida, descricao, qtdproduto FROM produto JOIN itenslista ON codigo = produto WHERE lista = ?");
                s2.setInt(1, codLista);
                ResultSet r2 = s2.executeQuery();

                ArrayList<Produto> produtos = new ArrayList<>();
                while (r2.next()){
                    String cod = r2.getString("codigo");
                    String nome = r2.getString("nome");
                    String marca = r2.getString("marca");
                    String un_medida = r2.getString("un_medida");
                    String descricao = r2.getString("descricao");
                    int qtd = r2.getInt("qtdproduto");

                    produtos.add(new Produto(cod, nome, marca, un_medida, descricao,qtd));
                }
                listas.add(new Lista(codLista, userId, nomeLista, produtos));
            }

            connect.commit();


        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return  listas;
    }

    public boolean deleteList(JsonObject json){
        Connection connect = Connect.getConnection();
        PreparedStatement s1, s2, s3 = null;
        boolean status = true;

        int idLista = json.get("lista").getAsInt();
        int idUser = json.get("user").getAsInt();
        String senha = json.get("password").toString().replaceAll("\"", "");

        if(UserDAO.validarSenha(idUser, senha)) {
            try {
                connect.setAutoCommit(false);

                s1 = connect.prepareStatement("DELETE FROM itenslista WHERE lista = ?");
                s1.setInt(1, idLista);

                s1.executeUpdate();

                s2 = connect
                    .prepareStatement("DELETE FROM lista WHERE codigo = ? AND usuario = ?");
                s2.setInt(1, idLista);
                s2.setInt(2, idUser);

                s2.executeUpdate();

                connect.commit();
                status = true;

            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }

        return  status;
    }

}
