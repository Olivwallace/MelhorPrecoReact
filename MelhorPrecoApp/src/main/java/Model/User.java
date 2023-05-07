/**
 * @file User.java
 * @author Wallace Freitas Oliveira (https://github.com/Olivwallace)
 * @brief Model User For Melhor Preco App
 * @date 18-04-2023
 */

 package Model;
 import Utels.SHA_256;
 import com.google.gson.*;

 import java.sql.Date;
 import java.util.Random;


public class User {

   //--------------------------------- Atribultos ----------------------------------------//

    private int id;             //Primary Key
    
    private String CPF;         //Data User
    private String nome;
    private String sobrenome;
    private Date nascimento;
    private int pontos;
    private char genero;
    private LoginData dadosLogin;


   //------------------------------- Construtores --------------------------------------

   //Reposta Login
   public  User(int id, String nome, String email){
      setID(id);
      setNome(nome);
      setDadosLogin(new LoginData(email, LoginData.gerarToken()));
   }

   //Cadastro
   public User(JsonObject user, JsonObject loginData){
      setID((user.get("id") != null)?user.get("id").getAsInt():0);
      setCPF(user.get("CPF").toString().replaceAll("\"",""));
      setNome(user.get("nome").toString().replaceAll("\"",""));
      setGenero(user.get("genero").toString().charAt(1));
      setSobrenome(user.get("sobrenome").toString().replaceAll("\"",""));
      setNascimento(Date.valueOf(user.get("nascimento").getAsString()));
      setDadosLogin(new LoginData(loginData));
   }

   public User(int id,String nome, String sobrenome, Date datanascimento, String cpf, char genero, int pontos, String email) {
      setID(id);
      setNome(nome);
      setSobrenome(sobrenome);
      setNascimento(datanascimento);
      setCPF(cpf);
      setGenero(genero);
      setPontos(pontos);
      setDadosLogin(new LoginData(email));
   }

   //--------------------------------- Setter's ----------------------------------------

   public void setID(int id){
      this.id = id;
   }

   public void setCPF(String CPF){
      this.CPF = CPF;
   }

   public void setNome(String nome){
      this.nome = nome;
   }

   public void setSobrenome(String sobrenome){
      this.sobrenome = sobrenome;
   }

   public void setNascimento(Date nascimento){
      this.nascimento = nascimento;
   }

   public void setPontos(int pontos){
      this.pontos = pontos;
   }

   public void setGenero(char genero){
      this.genero = genero;
   }

   public void setDadosLogin(LoginData dadosLogin) {
      this.dadosLogin = dadosLogin;
   }

   //--------------------------------- Getter's --------------------------------------

   public int getId() {
      return id;
   }

   public String getCPF() {
      return CPF;
   }

   public String getNome() {
      return nome;
   }

   public String getSobrenome() {
      return sobrenome;
   }

   public Date getNascimento() {
      return nascimento;
   }

   public int getPontos() {
      return pontos;
   }

   public LoginData getDadosLogin() {
      return dadosLogin;
   }

   public char getGenero(){
      return genero;
   }

   public String getMaskCPF(){
      String cpf_mask = CPF.replaceAll("[^\\d]", "");

      StringBuilder sb = new StringBuilder();
      sb.append(cpf_mask.substring(0, 3));
      sb.append(".");
      sb.append("***");
      sb.append(".");
      sb.append("***");
      sb.append("-");
      sb.append(cpf_mask.charAt(9));
      sb.append(cpf_mask.charAt(10));

      return sb.toString();
   }

   //------------------------------- Valida Campos Sensiveis -------------------------

   public static boolean comparePass(String senha, String hash_pass, String salt){
      String senha_hash = SHA_256.hashPassword(senha, salt);
      return  senha_hash.equals(hash_pass);
   }

   public static boolean compareCPF(String cpf, String hash_cpf){
      return  hash_cpf.equals(SHA_256.hash(cpf));
   }

}