/**
 * @file UserDAO.java
 * @author Wallace Freitas Oliveira (https://github.com/Olivwallace)
 * @brief  User Interaction with DB
 * @date 23-04-2023
 */

package Dao;

import java.sql.*;
import Connection.Connect;
import Model.LoginData;
import Model.User;
import Utels.SHA_256;
import com.google.gson.*;

public class UserDAO {

    public boolean setToken(int idUser, String token) {
        boolean status = true;

        Connection conexao = Connect.getConnection();
        PreparedStatement statement = null;

        try {

            statement = conexao.prepareStatement("UPDATE usuario SET token = ? WHERE id = ?");
            statement.setString(1, token);
            statement.setInt(2, idUser);

            status = statement.executeUpdate() > 0;

        } catch (SQLException e) {
            status = false;
            throw new RuntimeException(e);
        }

        return status;
    }

    public User validateToken(String token) {
        Connection connect = Connect.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;

        User user = null;
        try {

            statement = connect.prepareStatement("SELECT id, CONCAT(nome,' ',sobrenome) AS nome_completo, email FROM usuario WHERE token = ?");
            statement.setString(1, token);

            result = statement.executeQuery();

            if (result.next()) {
                int id = result.getInt("id");
                String nome_completo = result.getString("nome_completo");
                String email = result.getString("email");

                user = new User(id, nome_completo, email);
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return user;
    }

    public User singIn(LoginData loginData) {
        Connection connect = Connect.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;

        User user = null;

        try {

            statement = connect.prepareStatement("SELECT id, CONCAT(nome,' ',sobrenome) AS nome_completo, email, senha, salt FROM usuario WHERE email = ?");
            statement.setString(1, loginData.getEmail());

            result = statement.executeQuery();

            if (result.next()) {
                int id = result.getInt("id");
                String nome_completo = result.getString("nome_completo");
                String email = result.getString("email");
                String senha = result.getString("senha");
                String salt = result.getString("salt");

                if (User.comparePass(loginData.getPassword(), senha, salt)) {
                    user = new User(id, nome_completo, email);
                    setToken(id, user.getDadosLogin().getToken());
                }
            }


        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return user;
    }

    public boolean logout(int id) {
        return setToken(id, "");
    }

    public boolean existEmail(String email) {
        Connection connect = Connect.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;

        boolean status = false;

        try {

            statement = connect.prepareStatement("SELECT COUNT(*) AS num_itens FROM usuario WHERE email = ?");
            statement.setString(1, email);

            result = statement.executeQuery();

            if (result.next()) {
                int count = result.getInt("num_itens");
                status = count > 0;
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return status;
    }

    public boolean existCPF(String CPF) {
        Connection connect = Connect.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;

        boolean status = false;

        try {

            statement = connect.prepareStatement("SELECT COUNT(*) AS num_itens FROM usuario WHERE CPF = ?");
            statement.setString(1, SHA_256.hash(CPF));

            result = statement.executeQuery();

            if (result.next()) {
                int count = result.getInt("num_itens");
                status = count > 0;
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return status;
    }

    public boolean registerUser(User newUser) {
        Connection connect = Connect.getConnection();
        PreparedStatement statement = null;
        boolean status = true;

        String email = newUser.getDadosLogin().getEmail();
        String token = newUser.getDadosLogin().getToken();
        String salt = SHA_256.generateSalt();
        String senha = SHA_256.hashPassword(newUser.getDadosLogin().getPassword(), salt);

        try {
            statement = connect
                    .prepareStatement("INSERT INTO usuario (CPF, cpf_mask, nome, sobrenome, datanascimento, genero, senha, token, salt, email) VALUES (?,?,?,?,?,?,?,?,?,?)");

            statement.setString(1, SHA_256.hash(newUser.getCPF()));
            statement.setString(2, newUser.getMaskCPF());
            statement.setString(3, newUser.getNome());
            statement.setString(4, newUser.getSobrenome());
            statement.setDate(5, newUser.getNascimento());
            statement.setString(6, String.valueOf(newUser.getGenero()));
            statement.setString(7, senha);
            statement.setString(8, token);
            statement.setString(9, salt);
            statement.setString(10, email);


            status = statement.executeUpdate() > 0;

        } catch (SQLException e) {
            status = false;
            throw new RuntimeException(e);
        }

        return status;
    }

    public boolean updateUser(User useChanged) {
        Connection connect = Connect.getConnection();
        PreparedStatement statement = null;
        boolean status = true;

        try {
            statement = connect
                    .prepareStatement("UPDATE usuario SET CPF = ?, cpf_mask = ?,  nome = ?, sobrenome = ?, genero = ?, datanascimento = ? WHERE id = ?");
            statement.setString(1, SHA_256.hash(useChanged.getCPF()));
            statement.setString(2, useChanged.getMaskCPF());
            statement.setString(3, useChanged.getNome());
            statement.setString(4, useChanged.getSobrenome());
            statement.setString(5, String.valueOf(useChanged.getGenero()));
            statement.setDate(6, useChanged.getNascimento());
            statement.setInt(7, useChanged.getId());

            status = statement.executeUpdate() > 0;

        } catch (SQLException e) {
            status = false;
            throw new RuntimeException(e);
        }

        return status;
    }

    public boolean updatePassword(JsonObject json) {
        Connection connect = Connect.getConnection();
        PreparedStatement statement = null;
        boolean status = true;
        String salt = SHA_256.generateSalt();
        String senha = json.get("password").toString().replaceAll("\"", "");

        try {
            statement = connect
                    .prepareStatement("UPDATE usuario SET senha = ?, salt = ?  WHERE email = ? AND CPF = ? AND datanascimento = ?");
            statement.setString(1, SHA_256.hashPassword(senha, salt));
            statement.setString(2, salt);
            statement.setString(3, json.get("email").toString().replaceAll("\"", ""));
            statement.setString(4, SHA_256.hash(json.get("CPF").toString().replaceAll("\"", "")));
            statement.setDate(5, Date.valueOf(json.get("nascimento").toString().replaceAll("\"", "")));

            status = statement.executeUpdate() > 0;

        } catch (SQLException e) {
            status = false;
            throw new RuntimeException(e);
        }

        return status;
    }

    public boolean setPontos(JsonObject json) {
        Connection connect = Connect.getConnection();
        PreparedStatement statement = null;
        boolean status = true;

        try {
            statement = connect
                    .prepareStatement("UPDATE usuario SET pontos = ? WHERE id = ? AND email = ?");

            statement.setInt(1, json.get("pontos").getAsInt());
            statement.setInt(2, json.get("id").getAsInt());
            statement.setString(3, json.get("email").toString().replaceAll("\"", ""));

            status = statement.executeUpdate() > 0;

        } catch (SQLException e) {
            status = false;
            throw new RuntimeException(e);
        }

        return status;
    }

    public User getUser(int id) {
        Connection connect = Connect.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;

        User user = null;

        try {

            statement = connect.prepareStatement("SELECT nome, sobrenome, datanascimento, cpf_mask, genero, pontos, email FROM usuario WHERE id = ?");
            statement.setInt(1, id);

            result = statement.executeQuery();

            if (result.next()) {
                String nome = result.getString("nome");
                String sobrenome = result.getString("sobrenome");
                Date datanascimento = result.getDate("datanascimento");
                String cpf = result.getString("cpf_mask");
                char genero = result.getString("genero").charAt(0);
                int pontos = result.getInt("pontos");
                String email = result.getString("email");

                user = new User(id, nome, sobrenome, datanascimento, cpf, genero, pontos, email);
            }


        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return user;
    }

    private boolean confirmDelete(int id, String senha_informada, String cpf_informado) {
        Connection connect = Connect.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;

        boolean status = false;

        try {
            statement = connect.prepareStatement("SELECT senha, salt, CPF FROM usuario WHERE id = ?");
            statement.setInt(1, id);
            result = statement.executeQuery();

            if (result.next()) {
                String cpf = result.getString("CPF");
                String salt = result.getString("salt");
                String senha = result.getString("senha");

                status = User.comparePass(senha_informada, senha, salt) && User.compareCPF(cpf_informado, cpf);
            }

        } catch (SQLException e) {
            status = false;
            throw new RuntimeException(e);
        }

        return status;
    }

    public static  boolean validarSenha(int id, String senha_informada){
        Connection connect = Connect.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;

        boolean status = false;

        try {
            statement = connect.prepareStatement("SELECT senha, salt, CPF FROM usuario WHERE id = ?");
            statement.setInt(1, id);
            result = statement.executeQuery();

            if (result.next()) {
                String salt = result.getString("salt");
                String senha = result.getString("senha");

                status = User.comparePass(senha_informada, senha, salt);
            }

        } catch (SQLException e) {
            status = false;
            throw new RuntimeException(e);
        }

        return status;
    }

    public boolean deleteUser(JsonObject json){
        Connection connect = Connect.getConnection();
        PreparedStatement statement = null;
        ResultSet result = null;

        boolean status = false;

        int id = json.get("id").getAsInt();
        String cpf_informado = json.get("CPF").toString().replaceAll("\"","");
        String senha_informada = json.get("password").toString().replaceAll("\"","");

        try {
            if(confirmDelete(id, senha_informada, cpf_informado)) {
              statement = connect.prepareStatement("DELETE FROM usuario WHERE id = ?");
              statement.setInt(1, json.get("id").getAsInt());

              status = statement.executeUpdate() > 0;
            }
        }catch (SQLException e) {
            status = false;
            throw new RuntimeException(e);
        }

        return  status;
    }

}
