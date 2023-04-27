package Dao;

import Model.Lista;
import java.sql.Connection;
import Connection.Connect;
import Model.Produto;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ListaDAO {

    public boolean create(Lista lista){
        Connection connect = Connect.getConnection();
        PreparedStatement s1, s2, s3, s4 = null;
        boolean status = true;

        try {

            connect.setAutoCommit(false);

            s1 = connect.prepareStatement("INSERT INTO lista (nome, ultima_modificacao) VALUES (?, CURRENT_TIMESTAMP)");
            s1.setString(1, lista.getNomeLista());
            s1.executeUpdate();

            s2 = connect.prepareStatement("SELECT id FROM lista WHERE nome = ? ORDER BY ultima_modificacao DESC LIMIT 1");
            s2.setString(1, lista.getNomeLista());
            ResultSet res = s2.executeQuery();

            if(res.next()) {
                int idLista = res.getInt("id");

                s3 = connect.prepareStatement("INSERT INTO listausuario (usuario, lista, ultima_modificacao) VALUES (?, ?, CURRENT_TIMESTAMP)");
                s3.setInt(1, lista.getUserId());
                s3.setInt(2, idLista);

                s4 = connect.prepareStatement("INSERT INTO itenslista (lista, produto, qtdProduto, ultima_modificacao) VALUES (?, ?, ?, CURRENT_TIMESTAMP)");

                for (Produto p : lista.getItens()) {
                    s4.setInt(1, idLista);
                    s4.setString(2, p.getCodigo());
                    s4.setInt(3, p.getQuantidade());
                    s4.addBatch();
                }

                s4.executeBatch();
            }

            connect.commit();
            status = true;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return  status;
    }

    /*
    public boolean update(Lista lista){

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

    /*
    public boolean getLists(int userId){

    }

    public boolean deleteList(int listaId){

    }*/

}
